/*
Function that gets
- Block time per seconds
- Coingecko data
- Block of last churn
- Clean up the DB (Removing any items not in the ninerealms data)
- Checks for any retiring vaults

It stores all this data in our database
It is setup to run every 1 min
*/

var mysql = require('mysql');
const tools = require('./functions.js');
const fetch = require('node-fetch');


var poolArray = [];
poolArray[0] = mysql.createPool(tools.getDBcreds('thornode'));


exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false; //This sends response straight away once callback is called
    main(event, context, callback)
};



const main = async (event, context, callback) => {
    return mainFunction(event, context, callback)
}

const getAndSaveBlockTime = async (event, context, callback, maxHeight) => {
    
    const url1 = `http://134.209.135.23:27147/block?height=${maxHeight}`
    const url2 = `http://134.209.135.23:27147/block?height=${maxHeight-100}`
    console.log(url1, url2)
    
    const blockTime1_resp = await fetch(url1, {method: 'GET'});
    const blockTime1 = (await blockTime1_resp.json()).result.block.header.time; 
    
    const blockTime2_resp = await fetch(url2, {method: 'GET'});
    const blockTime2 = (await blockTime2_resp.json()).result.block.header.time; 
    
    //const blockTime1 = blockTime1_resp_tmp.result.block.header.time
    console.log('blockTime', blockTime1, blockTime2)
    
    const timeDiff = Math.abs(new Date(blockTime1) - new Date(blockTime2))
    const secondsPerBlock = timeDiff/(100*1000)
    
    await dbQueryAsyncWL(context, callback,`UPDATE noderunner.thornode_monitor_global SET secondsPerBlock = ${secondsPerBlock} WHERE primary_key = 1;`);
    return secondsPerBlock
}


const getAndSaveLastChurn = async (event, context, callback) => {
  const url = 'https://thornode.ninerealms.com/thorchain/vaults/asgard'
  const resp = await fetch(url, {method: 'GET'});
  const status_since = (await resp.json())[0].status_since; 
  await dbQueryAsyncWL(context, callback,`UPDATE noderunner.thornode_monitor_global SET lastChurn = '${status_since}' WHERE primary_key = 1;`);
  return status_since
    
}

const getCoinGeckoInfoAndSave = async (event, context, callback) => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=thorchain&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const resp = await fetch(url, {method: 'GET'});
  const response = await resp.json() 
  await dbQueryAsyncWL(context, callback,`UPDATE noderunner.thornode_monitor_global SET coingecko = '${JSON.stringify(response)}' WHERE primary_key = 1;`);
  return response
    
}

const checkRetiringVaults = async (event, context, callback) => {
  const url = 'https://thornode.ninerealms.com/thorchain/vaults/asgard'
  const resp = await fetch(url, {method: 'GET'});
  const response = await resp.json() 
  
  //Check for if vaults are retiring, if so set DB to true, if not set to false
  const areWeRetiring = (response.filter(item => item.status === 'RetiringVault')).length > 0
  console.log('-------:areWeRetiring', areWeRetiring)
  if(areWeRetiring) {
    await dbQueryAsyncWL(context, callback,`UPDATE noderunner.thornode_monitor_global SET retiring = 'true' WHERE primary_key = 1;`);
  } else {
    await dbQueryAsyncWL(context, callback,`UPDATE noderunner.thornode_monitor_global SET retiring = 'false' WHERE primary_key = 1;`);
  }
  
  return
}

/*
Function that checks if there are any nodes in our DB that aren't in the ninerealms API call
If so remove them from our DB
*/
const cleanUpDB = async (event, context, callback) => {
    //Get nodes in database
    let current_nodes_in_DB = await dbQueryAsyncWL(context, callback, `SELECT node_address FROM noderunner.thornode_monitor`);
    current_nodes_in_DB = current_nodes_in_DB.map(item => item.node_address)
    
    //Get our node data from nine realms to compare
    const response = await fetch(`https://thornode.ninerealms.com/thorchain/nodes`, {method: 'GET'});
    let allData = await response.json();
    
    //Return just address and remove any blanks
    allData = allData.filter(item => item.node_address !== "").map(item => item.node_address)
    
    var nodesToRemove = current_nodes_in_DB.filter(e=>!allData.includes(e));
    if (nodesToRemove.length === 0) return false
 
    const nodesToRemoveString = nodesToRemove.map(item => `'${item}'`)
    
    const query = `DELETE FROM noderunner.thornode_monitor where node_address IN (${nodesToRemoveString})`
    console.log('query', query)
    
    await dbQueryAsyncWL(context, callback, query);
    
    return true


}


const mainFunction = async (event, context, callback) => {
 
    //Get out max height so we can check some in
    const maxHeight = (await dbQueryAsyncWL(context, callback, `SELECT maxHeight FROM noderunner.thornode_monitor_global where primary_key = 1`))[0].maxHeight;
    
    const secondsPerBlock = await getAndSaveBlockTime(event, context, callback, maxHeight)
  
  
    const getCoinGeckoInfo = await getCoinGeckoInfoAndSave(event, context, callback)
    
    //In this api call we also need to check for any retiring vaults, if there is then we are in churn phase
    //But currently not sure what that looks like so need to wait
    const lastChurn = await getAndSaveLastChurn(event, context, callback)
    
    //Clean up the database by removing any items in DB that are not in the ninerealms data anymore
    await cleanUpDB(event, context, callback)
    
    //Check and save to DB if we have any retiring vaults
    await checkRetiringVaults(event, context, callback)
      
    return callback(null, 24) 
    //return callback(null, {val:secondsPerBlock, lastChurn: lastChurn, getCoinGeckoInfo: getCoinGeckoInfo})
 

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