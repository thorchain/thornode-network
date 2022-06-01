/*
Function that is invoked by API gateway and returns all the data from our database
This API is called from the react front end
*/

var mysql = require('mysql');
const AWS = require('aws-sdk');
const tools = require('./functions.js');


var poolArray = [];
poolArray[0] = mysql.createPool(tools.getDBcreds('thornode'));


exports.handler = (event, context, callback) => {
    
    context.callbackWaitsForEmptyEventLoop = false; //This sends response straight away once callback is called
    return readData(event, context, callback);

};

const readData = async (event, context, callback) => {
      const query = `SELECT * FROM noderunner.thornode_monitor`;
      const data = await dbQueryAsyncWL(context, callback, query);
      
      const globalData = await dbQueryAsyncWL(context, callback, 'SELECT * FROM noderunner.thornode_monitor_global')
      return callback(null, {data: data, globalData: globalData[0]})
}


/*
---------------------------------------------
---------------------------------------------
Query for database, is called here as we have a switch when we create the pool for different connections to databases because of whitelabelling
---------------------------------------------
---------------------------------------------
*/
const dbQueryAsyncWL = async (context, callback, query, queryData) => {   
  console.log('db query', query);
  return new Promise((resolve) => {
    poolArray[0].getConnection(function(error, connection) {
      connection.query(query, queryData, function (error, results, fields) {
        connection.release();
        if (error) {callback(error);} else {resolve(results);}
      });
    });
  })

}