// Query just on the hash key
//
var dynaBase = require('./dynaBase.js');
var docClient = dynaBase.docClient;

// We should get 2 hits on this query response
var params = {
  TableName : dynaBase.tableName,
  KeyConditions: docClient.Condition("pid", "EQ", "1234"),
}

console.log("Query for",params.KeyConditions,"on table",params.TableName);
docClient.query(params).eachPage(function(err, data) {
  if (err) {
    console.log("ERR",err); // an error occurred
  } else {
    console.log("RESULT",JSON.stringify(data)); // successful response
  }

});

