// Put more data to try out searching
//
var dynamoSetup= require('./lib/dynamo_setup.js');
var dynamoHelper = require('./lib/dynamo_helper.js');
var async = require('async');

var dynamo = dynamoSetup.dynamo;

var count=0;
async.whilst(
  function(){ return count < 200; },
  function(callback) {
    count++;
    console.log("PutItem",count);
    var pid="1"+count;
    var item = {pid:""+count,"state":"marklar","created":"12-08-2014",
      "session":{"Q1":{"answer":"-","answered_at":"98764"}},
      "main":true};
item = {pid : "1234","state":"inprogress"+count ,
"created":"07-08-2014 15:01:36.618 +00:00", "session":{"Q1":{"answer":"-","answered_at":"9876"}}, 
"name":"one", "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
"updated":"07-08-2014 15:02:03.206 +00:00", "main":true
}
    dynamoHelper.putItem(dynamo,item,callback);
  },
  function (err) {
    console.log("Done",err);
  });

