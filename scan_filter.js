var dynaBase = require('./dynaBase.js');
var docClient = dynaBase.docClient;

var params_name_scan = {
    TableName: dynaBase.tableName,
    'ExpressionAttributeValues' : { ':s' : 'two' },
    'ExpressionAttributeNames': {"#name" : "name"}, //is a dynamo keyword
    FilterExpression: "#name = :s",
    Limit: 15  // Limits the number of results per page
};

var params_GT = {
    TableName: dynaBase.tableName,
    'ExpressionAttributeValues' : { ':s' : '1' },
    FilterExpression: "pid > :s",
    Limit: 15  // Limits the number of results per page
};
var params_double = {
    TableName: dynaBase.tableName,
    'ExpressionAttributeValues' : { ':s' : '1',':p':false },
    FilterExpression: "begins_with(pid,:s)"+
      'AND main = :p',
    Limit: 15  // Limits the number of results per page
};
var params = {
    TableName: dynaBase.tableName,
    'ExpressionAttributeValues' : { ':s' : '1',':p':'9876' },
    'ExpressionAttributeNames': {"#sess" : "session"}, //is a dynamo keyword

    FilterExpression: "begins_with(pid,:s)"+
      'AND #sess.Q1.answered_at = :p',
    Limit: 15  // Limits the number of results per page
};

// Kick off the scan
docClient.scan (params).eachPage(function(err, data) {
  console.log("Scan",params.FilterExpression,"on table",params.TableName);
  if (err) {
      console.log(err); // an error occurred
  } else if (data) {
      console.log("Last scan processed " + data.ScannedCount + " items: ");
      var tests = [];
      for (var i = 0; i < data.Items.length; i++ ) {
          console.log("TT",i,JSON.stringify(data.Items[i]));
          tests.push(data.Items[i].Id);
      }
      console.log(" "  + tests.join(", "));
  } else {
      console.log("*** Finished scan ***");
  }
});
