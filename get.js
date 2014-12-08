// Try the get call on a specific key
// Scan all as a follow up
//
var AWS = require('aws-sdk'); 
var util = require('util');


AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

var params = {
    TableName : 'tester',
    Key : { 
      "pid" : { "S" : "1234" },
      "state" : { "S" : "inprogress" },
    }
  }

dynamodb.getItem(params, function(err, data) {
  if (err) {
    console.log("ERR",err); // an error occurred
  } else {
    console.log("RESULT",JSON.stringify(data)); // successful response
  }

  getALL();
});

function getALL() {
  console.log("ALL");
  params = {
    TableName: 'tester',
    Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
  };

  dynamodb.scan(params, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
    } else {
      console.log("The Scan call evaluated " + data.ScannedCount + " items");
      console.log(JSON.stringify(data)); 
    }
  });

  }
