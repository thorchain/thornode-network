
//Load in AWS Lambda environment variables for our database creds
let host = process.env.host
let user = process.env.user
let password = process.env.password
let database = process.env.database

module.exports = {
    
 /*
------------------------------------------
Function to get DB credentials
-----------------------------------------
*/        
getDBcreds: function(owner) {
      switch (owner) {
        case 'thornode': return {
            host: host,
            user: user,
            password: password,
            database: database,
        };
      }
    },   
    
};


