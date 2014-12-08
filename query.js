// Query just on the hash key
//
var AWS = require('aws-sdk'); 
var DOC = require("dynamodb-doc");


AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
var docClient = new DOC.DynamoDB(dynamodb);

// We should get 2 hits on this query response
var params = {
    TableName : 'tester',
    KeyConditions: docClient.Condition("pid", "EQ", "1234"),
  }

docClient.query(params).eachPage(function(err, data) {
  if (err) {
    console.log("ERR",err); // an error occurred
  } else {
    console.log("RESULT",JSON.stringify(data)); // successful response
  }

});

