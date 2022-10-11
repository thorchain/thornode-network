/*
This function checks the IPs of all nodes, everytime its run. 
It grabs the ninerealms data to find the IP address of nodes already in our DB, and then runs it against the IP API to grab geo location data
Once we have the API key set it up to check the geolocation
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


const main = async (event, context, callback) => {
    
    await updateIPs(event, context, callback)
    return

}

const updateIPs = async (event, context, callback) => {
 
    console.log('here 1')
    //Get all our nodes in our db
    const currentDBData = await dbQueryAsyncWL(context, callback, 'SELECT * FROM noderunner.thornode_monitor');
    //Get just the addresses of our nodes in our DB
    const nodeAddressesFromDB = currentDBData.map(item => {return item.node_address})
    
    //Get our node data from ninerealms (This is where the IP address is)
    const response = await fetch(`https://thornode.ninerealms.com/thorchain/nodes`, {method: 'GET'});
    let ninerealmsData = await response.json();
    
    //Cross filter our DB data with ninerealms, so we can then grab the IP address next
    const newData = ninerealmsData.filter(item => nodeAddressesFromDB.includes(item.node_address))
    const ipData = newData.map(item => {return {node_address: item.node_address, IP:item.ip_address}})

      for (let i=0; i<ipData.length; i++){
        
        //Once we have the API key for the service, we can uncomment below (code needs to be change and tested)
/*
         const url = `http://ip-api.com/json/${ipData[i].IP}`;
         const response = await fetch(url, {method: 'GET'});
         const respData = await response.json();
         currentDBData[i].ipData = respData
         //dataForNewNodes[i].ipData.city}','${dataForNewNodes[i].ipData.isp
         //These are location and isp in the database
  */
        const query = `UPDATE noderunner.thornode_monitor SET ip_address = '${ipData[i].IP}' WHERE node_address = '${ipData[i].node_address}'`
        await dbQueryAsyncWL(context, callback, query);

        console.log('query', query)
    }

    return callback(null, {length: ipData.length})

}




/*
---------------------------------------------
---------------------------------------------
Query for database, is called here as we have a switch when we create the pool for different connections to databases because of whitelabelling
---------------------------------------------
---------------------------------------------
*/
const dbQueryAsyncWL = async (context, callback, sqlq, queryData) => {   
  return new Promise((resolve) => {
    poolArray[0].getConnection(function(error, connection) {
      connection.query(sqlq, queryData, function (error, results, fields) {
        connection.release();
        if (error) {callback(error);} else {resolve(results);}
      });
    });
  })

}