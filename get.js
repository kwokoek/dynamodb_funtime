// Try the get call on a specific key
// Scan all as a follow up
//
var dynamoSetup= require('./lib/dynamo_setup.js');
var dynamoHelper = require('./lib/dynamo_helper.js');

var key = { 
  "pid" : "1234" ,
  "state" : "inprogress" ,
}

var dynamo = dynamoSetup.dynamo;
// can override values here

dynamoHelper.getItem(dynamo,key, function(err, data) {
  if (err) {
    console.log("ERR",err); // an error occurred
  } else {
    console.log("RESULT",JSON.stringify(data)); // successful response
  }
  step2();

});


// handle async for test, wrap up in function
function step2() {
  dynamoHelper.getAll(dynamo, function(err, data) {
    if (err) {
      return console.log(err); // an error occurred
    } 

    if(data.Items.length > 0) {
      for(var idx in data.Items) {
        console.log("Item[",idx,"] = ",JSON.stringify(data.Items[idx]));
      }
    }
    
  });

}
