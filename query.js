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

query(dynamo,filters,function(err,data) {
      if(data.length > 0) {
        for(var idx in data) {
          console.log("Item[",idx,"] = ",JSON.stringify(data[idx]));
        }
      }
});

function query(dynamo,filters,callback) {
  var params = {
    TableName: dynamo.tableName
  };
  params = _.extend(params,filters);

  var results = [];
  dynamo.dynamodb.query(params).eachPage(function(err, data) {
    if(data && data.Items) {
      return _.extend(results,data.Items);
    }
    callback(err,results);
  });
}
