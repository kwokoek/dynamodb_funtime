// Shared base for common inclusions and definitions for dynamodb interactions
//
var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-1"});

AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
exports.dynamodb = dynamodb;
exports.docClient = new DOC.DynamoDB(dynamodb);

// Easy way to test. Look for an ENV override, defaulting to tester
exports.tableName = process.env.dynamotable||"tester"

