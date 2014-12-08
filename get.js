// Try the get call on a specific key
// Scan all as a follow up
//
var dynamo_setup= require('./lib/dynamo_setup.js');
var readDynamo = require('./lib/dynamo_read.js');

var key = { 
  "pid" : "1234" ,
  "state" : "inprogress" ,
}

var dynamo = dynamo_setup.dynamo;
// can override values here

console.log("DY",dynamo);
readDynamo.getItem(dynamo,key, function(err, data) {
  if (err) {
    console.log("ERR",err); // an error occurred
  } else {
    console.log("RESULT",JSON.stringify(data)); // successful response
  }

});

/*
function getALL() {
  console.log("ALL");
  params = {
    TableName: dynaBase.tableName,
    Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
    } else {
      console.log("The Scan call evaluated " + data.ScannedCount + " items");
      console.log(JSON.stringify(data)); 
    }
  });

  }
 */
