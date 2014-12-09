// Put some json content into dynamo
//
var dynamo_setup= require('./lib/dynamo_setup.js');
var readDynamo = require('./lib/dynamo_read.js');

var dynamo = dynamo_setup.dynamo;

var item1 = {pid : "1234","state":"inprogress",
"created":"07-08-2014 15:01:36.618 +00:00", "session":{"Q1":{"answer":"-","answered_at":"9876"}}, 
"name":"one", "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
"updated":"07-08-2014 15:02:03.206 +00:00", "main":true
}

var item2 = {pid : "1234","state":"complete",
  "created":"07-09-2014 15:01:36.618 +00:00", "session":{"Q1":{"answer":"-","answered_at":"99876"}}, 
  "name":"two", 
  "updated":"07-09-2014 15:02:03.206 +00:00","main":false
}

readDynamo.putItem(dynamo,item1, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log("PutItem on",item1.pid+item1.state,"returned successfully");
});

readDynamo.putItem(dynamo,item2, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log("PutItem on",item2.pid+item2.state,"returned successfully");
});



