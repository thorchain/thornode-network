/*
This function grabs all the data from https://thornode.ninerealms.com/thorchain/nodes and stores it in our database
If there are any new nodes in this response, it graps their IP location from http://ip-api.com
*/

var mysql = require('mysql');
const AWS = require('aws-sdk');
const tools = require('./functions.js');
const fetch = require('node-fetch');

var poolArray = [];
poolArray[0] = mysql.createPool(tools.getDBcreds('thornode'));

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false; //This sends response straight away once callback is called
    main(event, context, callback)
};

let timer = []
let count = 0

const main = async (event, context, callback) => {
      
    //if we run manually from lambda function then just run code once
    if (event.event === 'test') {
      await grabDataAndSaveToDB(event, context, callback)
      callback(null, 24)
    }else {
      timer = setInterval(() => {
      grabDataAndSaveToDB(event, context, callback)
      count = count + 1
      console.log(count)
      if (count===8) {
        clearInterval(timer);
        return callback(null, 24)
      }
    }, 7000)
    }


  
}

const grabLatestBlockHeight = async (event, context, callback, allData) => {
  /*
    Get the latest block height from 3 random nodes and take max value
    Makes it redundant incase a node fails
    http://45.55.98.244:27147/abci_info?
    */
    const activeNodes = allData.filter(item => item.status === "Active")
    Array.prototype.random = function () {
      return this[Math.floor((Math.random()*this.length))];
    }
    const block1 = fetch(`http://${activeNodes.random().ip_address}:27147/abci_info?`, {method: 'GET'});
    const block2 = fetch(`http://${activeNodes.random().ip_address}:27147/abci_info?`, {method: 'GET'});
    const block3 = fetch(`http://${activeNodes.random().ip_address}:27147/abci_info?`, {method: 'GET'});

    let [a,b, c] = await Promise.all([block1, block2, block3]).then((values) => {
      return values;
    });
    const block1resp = a.json();    
    const block2resp = b.json();    
    const block3resp = c.json();
    
    const [ba,bb, bc] = await Promise.all([block1resp, block2resp, block3resp]).then((values) => {
      return values;
    });
    
    const maxHeight = Math.max(ba.result.response.last_block_height, bb.result.response.last_block_height, bc.result.response.last_block_height)
    
    return maxHeight;
}

/*
This function splits allData (ninnrealms response) into nodes we already have in our DB and new node
*/
const splitNodes = async (event, context, callback, allData) => {
    //Grab current data
    const currentDBData = await dbQueryAsyncWL(context, callback, 'SELECT * FROM noderunner.thornode_monitor');
    //Get the node_address of current data in out DB
    const currentAddresses = currentDBData.map(item => item.node_address)
    //Get the node_address of response from ninerealms (new data)
    const newAddresses = allData.map(item => item.node_address)

    //Filter on the difference between old and new, to show new addresses only
    let array1 = currentAddresses;
    let array2 = newAddresses;
    let existing = array1.filter(el => array2.includes(el));

    let difference = array1
                 .filter(x => !array2.includes(x))
                 .concat(array2.filter(x => !array1.includes(x)));

    const dataForExistingNodes = allData.filter(function (el) {
      return existing.includes(el.node_address);
    });
    const dataForNewNodes = allData.filter(function (el) {
      return difference.includes(el.node_address);
    });
    
    return {dataForExistingNodes, dataForNewNodes}
}

const grabDataAndSaveToDB = async (event, context, callback) => {
  
    //Get our node data
    const response = await fetch(`https://thornode.ninerealms.com/thorchain/nodes`, {method: 'GET'});
    let allData = await response.json();
    
    //await dbQueryAsyncWL(context, callback,`UPDATE noderunner.thornode_monitor_global SET ninerealms = '${JSON.stringify(allData)}' WHERE primary_key = 1;`);
    
    //Filter out the first value that is blank (and any others if there are any)
    allData = allData.filter(item => item.node_address !== "")
    
    
    //Get max block height
    const maxHeight = await grabLatestBlockHeight(event, context, callback, allData)
    await dbQueryAsyncWL(context, callback, `UPDATE noderunner.thornode_monitor_global SET maxHeight = ${maxHeight} WHERE primary_key = 1;`);

    /*
    We check here to see if we are in a churn or waiting to churn, if so end running on function
    We do this because we want the GUI to show the last block before the churn so people can see where they ended up with who is churning in/out
    To make same as current dashboard, when churning we want to show data, only stop updating when in negative seconds
    */
    const query = `select case when ((lastChurn + churnInterval) - maxHeight) < 0 then 'true' else 'false' end as negativeSeconds from noderunner.thornode_monitor_global;`
    const negativeSeconds = (await dbQueryAsyncWL(context, callback, query))[0].negativeSeconds;
    if (negativeSeconds === 'true') {
      callback(null, {finished: 'true'})
    }

    
    /*
    We split our data into nodes we already have in our DB and new nodes from the ninerealms API call
    We do this because new nodes need their API check to see where they are located
    */
    const {dataForExistingNodes, dataForNewNodes} = await splitNodes(event, context, callback, allData);

    //Loop through the existing nodes and save to db
    for (let i=0; i<dataForExistingNodes.length; i++) {
          //const query = `REPLACE INTO noderunner.thornode_monitor (address, bond, rewards, slashes, ip_address) VALUES ('${dataForExistingNodes[i].node_address}', '${dataForExistingNodes[i].bond}', '${dataForExistingNodes[i].current_award}', '${dataForExistingNodes[i].slash_points}', '${dataForExistingNodes[i].ip_address}')`;
          const query = `UPDATE noderunner.thornode_monitor SET 
                            active_block_height = '${dataForExistingNodes[i].active_block_height}', 
                            bond_providers = '${JSON.stringify(dataForExistingNodes[i].bond_providers)}', 
                            bond = '${dataForExistingNodes[i].bond}', 
                            current_award = '${dataForExistingNodes[i].current_award}', 
                            slash_points = '${dataForExistingNodes[i].slash_points}', 
                            forced_to_leave = '${dataForExistingNodes[i].forced_to_leave}', 
                            requested_to_leave = '${dataForExistingNodes[i].requested_to_leave}', 
                            jail = '${JSON.stringify(dataForExistingNodes[i].jail)}' , 
                            bond_address = '${dataForExistingNodes[i].bond_address}', 
                            observe_chains = '${JSON.stringify(dataForExistingNodes[i].observe_chains)}', 
                            preflight_status = '${JSON.stringify(dataForExistingNodes[i].preflight_status)}', 
                            status = '${dataForExistingNodes[i].status}', 
                            status_since = '${dataForExistingNodes[i].status_since}', 
                            version = '${dataForExistingNodes[i].version}'
                        WHERE (node_address = '${dataForExistingNodes[i].node_address}');`
          await dbQueryAsyncWL(context, callback, query);
    }
    
    
    
    /*
    We loop through our new node data and call the IP data API
    */
  
    for (let i=0; i<dataForNewNodes.length; i++){

        if (dataForNewNodes.ip_address !== '') {
          try {
             const url = `http://ip-api.com/json/${dataForNewNodes[i].ip_address}`;
             const response = await fetch(url, {method: 'GET'});
             const respData = await response.json();
             dataForNewNodes[i].ipData = respData
          } catch (e) {
             dataForNewNodes[i].ipData = '-'
          }
        } else {
          dataForNewNodes[i].ipData = '-'
        }
    }
    
 
  
    //Loop through the new nodes and save to DB
    for (let i=0; i<dataForNewNodes.length; i++) {
         const query = `INSERT INTO noderunner.thornode_monitor 
         (node_address, ip_address, location, isp, active_block_height, bond_providers, bond, current_award, slash_points, 
         forced_to_leave, requested_to_leave, jail, bond_address, observe_chains, preflight_status, status, status_since, version)
          VALUES 
          ('${dataForNewNodes[i].node_address}', '${dataForNewNodes[i].ip_address}','${dataForNewNodes[i].ipData.city}','${dataForNewNodes[i].ipData.isp}',
          '${dataForNewNodes[i].active_block_height}','${JSON.stringify(dataForNewNodes[i].bond_providers)}','${dataForNewNodes[i].bond}',
          '${dataForNewNodes[i].current_award}','${dataForNewNodes[i].slash_points}','${dataForNewNodes[i].forced_to_leave}','${dataForNewNodes[i].requested_to_leave}','${JSON.stringify(dataForNewNodes[i].jail)}',
          '${dataForNewNodes[i].bond_address}','${JSON.stringify(dataForNewNodes[i].observe_chains)}','${JSON.stringify(dataForNewNodes[i].preflight_status)}',
          '${dataForNewNodes[i].status}','${dataForNewNodes[i].status_since}','${dataForNewNodes[i].version}')`
          await dbQueryAsyncWL(context, callback, query);
    }
    
    return null

}




/*
---------------------------------------------
---------------------------------------------
Query for database, is called here as we have a switch when we create the pool for different connections to databases because of whitelabelling
---------------------------------------------
---------------------------------------------
*/
const dbQueryAsyncWL = async (context, callback, query, queryData) => {   
  return new Promise((resolve) => {
    poolArray[0].getConnection(function(error, connection) {
      connection.query(query, queryData, function (error, results, fields) {
        connection.release();
        if (error) {callback(error);} else {resolve(results);}
      });
    });
  })

}