// Describe shows table settings, but also row count!
var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-1"});

AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

// Easy way to test. Look for an ENV override, defaulting to tester
var tableName = process.env.dynamotable||"tester"

// make a hash + range primary key
var params = {
    TableName: tableName,
};

dynamodb.describeTable(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(JSON.stringify(data));           // successful response
});

