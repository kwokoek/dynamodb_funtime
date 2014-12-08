var AWS = require('aws-sdk'); 

AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-west-2" })
var dynamodb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

// make a hash + range primary key
var params = {
    TableName: 'tester',
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

console.log("Creating table");
dynamodb.createTable(params, function(err, data) {
  if (err){
    console.log("ERR",err); // an error occurred
    return;
  }
  else console.log(data); // successful response


  // Try a describe call
  params = {
      TableName: 'tester'
  };
  dynamodb.describeTable(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
  });

});
