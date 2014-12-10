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
  scanPaging(dynamo,params,callback);

}

function scanPaging(dynamo,params,callback) {
  var dynamodb = dynamo.dynamodb;
  var results = [];

  // A callback that paginates through an entire DynamoDB table
  // The eachPage interface currently blows up after the first page, so using the callback
  // method for now. 
  function doScan(err, data) {
    if (err) {
      return callback(err);
    } 
    
    if(data.Items) {
      results = results.concat(data.Items);
    }

    // If the last key is passed, that means there is more data to pull 
    if ('LastEvaluatedKey' in data) {
      // Get next page by setting start key
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      dynamodb.scan(params, doScan);
    } else {
      callback(null,results);
    }
  }
  
  // begin the callback loop
  dynamodb.scan(params, doScan);
}

// add in page handling
exports.scan = function(dynamo,filters,callback) {
  params = {
    TableName: dynamo.tableName,
    Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
  };
  // allow caller to override the filters and the limit
  params = _.extend(params,filters);

  scanPaging(dynamo,params,callback);
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
      results = results.concat(data.Items);
      return;
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
