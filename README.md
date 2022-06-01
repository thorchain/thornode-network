# Thornode Monitor

There are several moving parts to this dashboard

1) Front end:
  - This is all the code in this repository, minus the lambda functions folder
  - Built using react
  - It calls an AWS API Gateway to collect data which it then displays

2) Back end:
  - Several parts to the backend
    1) AWS RDS database to store all the data
    2) AWS Lambda functions which collect the data and also provides the function for the api call
    3) AWS API Gateway which invokes one of the lambda functions to return the data to the front end

  - Back end lambda functions are in the 'lambda functions' folder, they consist of
    1) thormonitor_collect_data2: This function stores data about the nodes, ie bond, slash points status etc... into the DB
    2) thormonitor_collect_data_rpc_bifrost: This function checks the RPC and Bifrost API of each node and stores in the DB
    3) thornode_collect_data_global: This function stores info like block time per second and data from coingecko into the DB
    4) thormonitor: This is the lambda function which is invoked by the API call to return all the data to the front end from the DB



How to build:

1) ~ git clone https://github.com/thorchain/thornode-network.git
2) ~ cd thornode-network
3) ~ npm install
4) Upload the 4 functions to lambda and set them up to run every 1 minute except for the thormonitor code.
5) Create an AWS API Gateway that invokes thormonitor lambda function
6) Create aws-export.js in the src folder and enter the details of your AWS API Gateway
7) If your have populated your database with some data, all you need to do is '~ npm run start' and the front end should start pulling and displaying the data
