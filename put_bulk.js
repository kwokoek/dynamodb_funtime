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
    dynamoHelper.putItem(dynamo,item,callback);
  },
  function (err) {
    console.log("Done",err);
  });

