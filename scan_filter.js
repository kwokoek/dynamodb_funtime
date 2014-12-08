var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-1"});
AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })

var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

var params_name_scan = {
    TableName: 'tester',
    'ExpressionAttributeValues' : { ':s' : {'S':'two'} },
    'ExpressionAttributeNames': {"#name" : "name"}, //is a dynamo keyword
    FilterExpression: "#name = :s",
    Limit: 15  // Limits the number of results per page
};

var params_GT = {
    TableName: 'tester',
    'ExpressionAttributeValues' : { ':s' : {'S':'1'} },
    FilterExpression: "pid > :s",
    Limit: 15  // Limits the number of results per page
};
var params_double = {
    TableName: 'tester',
    'ExpressionAttributeValues' : { ':s' : {'S':'1'},':p':{'BOOL':false} },
    FilterExpression: "begins_with(pid,:s)"+
      'AND main = :p',
    Limit: 15  // Limits the number of results per page
};
var params = {
    TableName: 'tester',
    'ExpressionAttributeValues' : { ':s' : {'S':'1'},':p':{'S':'9876'} },
    'ExpressionAttributeNames': {"#sess" : "session"}, //is a dynamo keyword

    FilterExpression: "begins_with(pid,:s)"+
      'AND #sess.Q1.answered_at = :p',
    Limit: 15  // Limits the number of results per page
};

// Kick off the scan
console.log("Starting a Scan of the Image table");
dynamodb.scan (params).eachPage(function(err, data) {
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
