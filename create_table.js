// Creating the table is an admin operation
var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

// Easy way to test. Look for an ENV override, defaulting to tester
var tableName = process.env.dynamotable||"tester"

// make a hash + range primary key
var params = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: 'pid', KeyType: 'HASH' },
        { AttributeName: 'state', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'pid', AttributeType: 'S' },
        { AttributeName: 'state', AttributeType: 'S' },
    ],
    ProvisionedThroughput:  {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 5
    }
};

console.log("Creating table:",params.TableName);
dynamodb.createTable(params, function(err, data) {
  if (err){
    console.log("ERR",err); // an error occurred
    return;
  }
  else console.log(data); // successful response

});
