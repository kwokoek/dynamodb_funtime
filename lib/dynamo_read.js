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
