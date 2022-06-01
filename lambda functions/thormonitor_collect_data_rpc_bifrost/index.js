/*
Function that connects to nodes and checks RPC and Bifrost health
Stores results in our database
Code is run every minute by AWS, yet code loops 6 times and runs internally every 10 seconds.
This is due to min frequency on AWS is 1 min
We only look at half the nodes at each 10 second interval, if node takes longer than 6 seconds to return, it's considered a bad reading
*/


var mysql = require('mysql');
const AWS = require('aws-sdk');
const tools = require('./functions.js');
const axios = require('axios').default;

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
      await grabDataAndSaveToDB(event, context, callback, true)//true does first half, false does second half
      await grabDataAndSaveToDB(event, context, callback, false)
      callback('null', 100)
    } else {
      //Wait 6 seconds then call code again, do it 10 times
      timer = setInterval(() => {
        grabDataAndSaveToDB(event, context, callback, count % 2)//returns true if off number, so we just do half nodes at time
        count = count + 1
        console.log(count)
        if (count===6) {
          clearInterval(timer);
          return callback(null, 34)
        }
      }, 10000)
    }

}

//This function is an async but with a stopper by using the Promise.race
//So if the api call takes longer than X seconds, it will return false
const race = async (event, context, callback, url) => {

  //Function that wait X seconds then resolves false
  const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(false);
      }, 6 * 1000);

  });
  //Make our api call to the node end point
  const p2 = new Promise((resolve, reject) => {
        axios.get(url)
          .then(resp => {
            resolve(true)
          })
          .catch(e => {
            resolve(false)
          })

  });

  //If the node api call takes longer than X seconds, then that function resolves false
  const x = Promise.race([p1, p2])
  return x

}


const grabDataAndSaveToDB = async (event, context, callback, firstHalf) => {

    //Grab all our nodes from our DB
    const query = `SELECT node_address, ip_address FROM noderunner.thornode_monitor order by node_address`;
    let myNodes =  await dbQueryAsyncWL(context, callback, query);

    //Alternate between first half and second half (Trying to fix bad rpc calls comeing back, assuming it's making too many requests in one go)
    myNodes = firstHalf ? myNodes.slice(0,myNodes.length/2) : myNodes.slice(myNodes.length/2, myNodes.length)


    //Check the rpc and bifrost all in one go
    const x = await Promise.all(myNodes.map(async item => {
      const bifrostURL = `http://${item.ip_address}:6040/p2pid`;
      const healthUrl = `http://${item.ip_address}:27147/health?`;

      const bifrost = await race(event, context, callback, bifrostURL)
      const health = await race(event, context, callback, healthUrl)

      return {node_address: item.node_address, bifrost: bifrost, rpc: health, bifrostURL: bifrostURL, healthUrl: healthUrl}

    }));
    //console.log('------x', x)

    //Loop through the returned data and save it to the DB
    for (let i=0; i<x.length; i++) {
          const query = `UPDATE noderunner.thornode_monitor SET
            rpc = '${x[i].rpc}',
            bifrost = '${x[i].bifrost}'
            WHERE (node_address = '${x[i].node_address}');`
          await dbQueryAsyncWL(context, callback, query);
    }

    console.log('here 1')
    return null
    //return callback(null, x)

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
