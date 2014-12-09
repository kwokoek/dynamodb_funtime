var dynamoSetup= require('./lib/dynamo_setup.js');
var dynamoHelper = require('./lib/dynamo_helper.js');

var dynamo = dynamoSetup.dynamo;

var params_name_scan = {
    'ExpressionAttributeValues' : { ':s' : 'two' },
    'ExpressionAttributeNames': {"#name" : "name"}, //is a dynamo keyword
    FilterExpression: "#name = :s",
    Limit: 15  // Limits the number of results per page
};

var params_GT = {
    'ExpressionAttributeValues' : { ':s' : '1' },
    FilterExpression: "pid > :s",
    Limit: 15  // Limits the number of results per page
};
var params_double = {
    'ExpressionAttributeValues' : { ':s' : '1',':p':false },
    FilterExpression: "begins_with(pid,:s)"+
      'AND main = :p',
    Limit: 15  // Limits the number of results per page
};
var params = {
    'ExpressionAttributeValues' : { ':s' : '1',':p':'9876' },
    'ExpressionAttributeNames': {"#sess" : "session"}, //is a dynamo keyword

    FilterExpression: "begins_with(pid,:s)"+
      'AND #sess.Q1.answered_at = :p',
};

dynamoHelper.scan(dynamo,params,function(err,data) {
  if (err) {
      console.log(err); // an error occurred
  } else if (data) {
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
