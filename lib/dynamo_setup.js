// Shared base for common inclusions and definitions for dynamodb interactions
//
var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-1"});

AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

// Provide a consumable dynamo config to pass to the lib helpers
// Override any fields required
exports.dynamo= {
  dynamodb:new DOC.DynamoDB(dynamodb),
  tableName: process.env.dynamotable||"tester"
}
