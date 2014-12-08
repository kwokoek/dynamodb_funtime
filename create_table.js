var dynaBase = require('./dynaBase.js');

// make a hash + range primary key
var params = {
    TableName: dynaBase.tableName,
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
dynaBase.dynamodb.createTable(params, function(err, data) {
  if (err){
    console.log("ERR",err); // an error occurred
    return;
  }
  else console.log(data); // successful response


  // Try a describe call
  params = {
      TableName: 'tester'
  };
  dynaBase.dynamodb.describeTable(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
  });

});
