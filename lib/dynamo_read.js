// Wrap the read calls into helper functions

// Get a specific keyed item
// Ex: key = { "pid" : "1234" , "state" : "inprogress" , }
exports.getItem = function(dynamo,key,callback) {

  var params = {
    TableName : dynamo.tableName,
    Key : key,
  }
  console.log("Get id",params.Key,"from table",params.TableName);
  dynamo.dynamodb.getItem(params, function(err, data) {
    callback(err,data);
  });
}


// Test wrapper to get all, max 5 items
exports.getAll = function(dynamo,callback) {
  params = {
    TableName: dynamo.tableName,
    Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
  };
  console.log("Get all in table",params.TableName);

  dynamo.dynamodb.scan(params, function(err, data) {
    if (!err) {
      console.log("The Scan call evaluated " + data.ScannedCount + " items");
    }
    callback(err,data);
  });

}
