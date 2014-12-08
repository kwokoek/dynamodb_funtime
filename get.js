// Try the get call on a specific key
// Scan all as a follow up
//
var dynaBase = require('./dynaBase.js');
var docClient = dynaBase.docClient;

var params = {
  TableName : dynaBase.tableName,
  Key : { 
    "pid" : "1234" ,
    "state" : "inprogress" ,
  }
}

console.log("Get id",params.Key,"from table",params.TableName);
docClient.getItem(params, function(err, data) {
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
    TableName: dynaBase.tableName,
    Limit: 5  // Limits the number of results per page (beyond the default 1MB limit)
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
    } else {
      console.log("The Scan call evaluated " + data.ScannedCount + " items");
      console.log(JSON.stringify(data)); 
    }
  });

  }
