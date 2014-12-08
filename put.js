// Put some json content into dynamo
//
var dynaBase = require('./dynaBase.js');

var docClient = dynaBase.docClient;

var params = { };
params.TableName = dynaBase.tableName,
params.Item = {pid : "1234","state":"inprogress",
"created":"07-08-2014 15:01:36.618 +00:00", "session":{"Q1":{"answer":"-","answered_at":"9876"}}, 
"name":"one", "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
"updated":"07-08-2014 15:02:03.206 +00:00", "main":true
}

console.log("Put id",params.Item.pid,"to table",params.TableName);

docClient.putItem(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log("PutItem returned successfully");

    put2();
});

function put2() {
  var params = { };
  params.TableName = dynaBase.tableName,
  params.Item = {pid : "1234","state":"complete",
  "created":"07-09-2014 15:01:36.618 +00:00", "session":{"Q1":{"answer":"-","answered_at":"99876"}}, 
  "name":"two", 
  "updated":"07-09-2014 15:02:03.206 +00:00","main":false
  }
  docClient.putItem(params, function(err, data) {
      if (err) console.log(err); // an error occurred
      else console.log("PutItem returned successfully");
  });

}



