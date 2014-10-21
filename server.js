//--- server.resilience.me - a @BitNation #DApp --------------

//--- First section connects to a MongoDB database -----------

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  
//---- Define the MongoDB schemas and models:

// to Darklight: need help to create the schemas

var account_database_schema = new Schema({
    account_id: String
  , DIVIDEND_PATWAYS: [{account: String, data: [{currency: String, data: [{taxRate: String, data: [{total_pathway: String}]}]}]}]
  , TAXRATE_UPPER_LIMIT: [{currency: String, data: [{taxRate: String, data: [{total_amount: String}]}]}]
});


var transaction_database_schema = new Schema({
    account: String
  , connected_transactions: [{transaction_id: String}]
});

var account_data = mongoose.model('account_data', account_database_schema);

var transaction_log = mongoose.model('transaction_log', account_database_schema);

});


mongoose.connect('mongodb://unicorn23:asd123@proximus.modulusmongo.net:27017/gup6umEm');




//----- Open a websocket for http://client.resilience.me -------

var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");

    conn.on("text", function (str) {
        console.log("Received DATA_BLOB");
        var DATA_BLOB = JSON.parse(str);
        console.log(DATA_BLOB);
        

// DATA_BLOB should be fed into MongoDB

// to Darklight: need help to feed DATA_BLOB into the MongoDB


// ------- Swarm-Redistribution Algorithm -------------

// script should then run swarm-redistribution algorithm
// and create a blob of unsigned outgoing payments
// and send back to client.resilience.me

// See http://www.resilience.me/videos.html for details

// example: conn.sendText(SWARM_PAYMENTS_BLOB)

        conn.sendText();
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(8080);

console.log("server listening on port 8080");


