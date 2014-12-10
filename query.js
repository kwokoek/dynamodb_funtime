// Query just on the hash key
var dynamoSetup= require('./lib/dynamo_setup.js');
var dynamoHelper = require('./lib/dynamo_helper.js');

var dynamo = dynamoSetup.dynamo;

// We should get 2 hits on this query response
var filters = {
  KeyConditions: dynamo.dynamodb.Condition("pid", "EQ", "1234"),
}

dynamoHelper.query(dynamo,filters,function(err,data) {
  console.log("Query results",data.length);

  return; // just show len
  if(data.length > 0) {
    for(var idx in data) {
      console.log("Item[",idx,"] = ",JSON.stringify(data[idx]));
    }
  } else {
    console.log("No results");
  }
});

