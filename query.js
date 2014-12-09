// Query just on the hash key
//
var dynamo_setup= require('./lib/dynamo_setup.js');
var readDynamo = require('./lib/dynamo_read.js');

var dynamo = dynamo_setup.dynamo;

var _=require('underscore');

// We should get 2 hits on this query response
var filters = {
  KeyConditions: dynamo.dynamodb.Condition("pid", "EQ", "1234"),
}

readDynamo.query(dynamo,filters,function(err,data) {
      if(data.length > 0) {
        for(var idx in data) {
          console.log("Item[",idx,"] = ",JSON.stringify(data[idx]));
        }
      }
});

