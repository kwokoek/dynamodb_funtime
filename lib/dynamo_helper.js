// Wrap the read calls into helper functions
var _=require('underscore');

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

// add in page handling
exports.scan = function(dynamo,filters,callback) {
  params = {
    TableName: dynamo.tableName,
    Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
  };
  // allow caller to override the filters and the limit
  params = _.extend(params,filters);

  dynamo.dynamodb.scan (params).eachPage(function(err, data) {
    console.log("Scan",params.FilterExpression,"on table",params.TableName);
    if (err) {
        callback(err);
    } else if (data) {
        console.log("Last scan processed " + data.ScannedCount + " items: ");
        callback(null,data);
    } else {
        callback();
    }
  });

}

// Query is an indexed search
// Paging!
exports.query = function(dynamo,filters,callback) {
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

// Put the object, which should contain all the keys required by the target table
exports.putItem =function(dynamo,item,callback) {
  var params = { 
    TableName : dynamo.tableName,
    Item : item
  }

  dynamo.dynamodb.putItem(params, function(err, data) {
    callback(err,data);
  });
}
