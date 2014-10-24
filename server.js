//--- server.resilience.me - a @BitNation #DApp --------------

//----- Open a websocket for http://client.resilience.me -------

var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");

    conn.on("text", function (str) {
        console.log("Received DATA_BLOB");
        var DATA_BLOB = JSON.parse(str);

var ACCOUNT_DATA = DATA_BLOB[0]
var TAX_BLOB = DATA_BLOB[1]
var SENT_BLOB = DATA_BLOB[2]
var ACCOUNT_ID = ACCOUNT_DATA[0].account_id


console.log(JSON.stringify(ACCOUNT_DATA))
console.log(JSON.stringify(TAX_BLOB))
console.log(JSON.stringify(SENT_BLOB))
console.log(JSON.stringify(ACCOUNT_ID))



//--- connect to a MongoDB database -----------

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

});



  
//---- Define the MongoDB schemas and models:

// USEFUL LINKS:
// http://docs.mongodb.org/manual/data-modeling/

// http://docs.mongodb.org/manual/reference/limits/#namespaces
// http://docs.mongodb.org/manual/faq/developers/#are-there-any-restrictions-on-the-names-of-collections

// http://mongoosejs.com/docs/api.html#query_Query-and


var dividend_pathways_schema = new Schema({
    account: String
  , currency: String
  , taxRate: String 
  , total_pathway: String
  
}, { collection: ACCOUNT_ID });

var taxRate_upper_limit_schema = new Schema({
     currency: String, 
     taxRate: String, 
     total_amount: String

}, { collection: ACCOUNT_ID });



var transaction_log_schema = new Schema({
    account: String
  , connected_transactions: {transaction_id: String}
}, { collection: "transaction_log" });


var account_data = mongoose.model('account_data', dividend_pathways_schema, ACCOUNT_ID);

var transaction_log = mongoose.model('transaction_log', transaction_log_schema, "transaction_log");



mongoose.connect('mongodb://unicorn23:asd123@proximus.modulusmongo.net:27017/gup6umEm');




//------ feed the data into MongoDB ---------

// all the data in TAX_BLOB should be fed into dividend_pathways

// the script below adds all TAX_BLOB elements that already have
// 'account', 'currency', and 'taxRate' entries in MongoDB


var temp = {
    account: "",
    currency: "",
    taxRate: "",
    amount: ""
};

for (var i = 0; i < TAX_BLOB.length; i++) {

    console.log("Scanning TAX_BLOB"+"["+[i]+"]"+" : " + JSON.stringify(TAX_BLOB[i]))
    
  temp.account = TAX_BLOB[i].account   //[i] can´t be assesed within a function
  temp.currency = TAX_BLOB[i].currency //adding values to {} temp
  temp.taxRate = TAX_BLOB[i].taxRate
  temp.amount = TAX_BLOB[i].amount

  // the code below updates db.ACCOUNT_ID.account_data:

  var query = account_data.find( {account: TAX_BLOB[i].account, currency: TAX_BLOB[i].currency, taxRate: (String(TAX_BLOB[i].taxRate))}
  , function(err, doc){console.log(doc)}
    )
    
    query.count(function(err, count){
        if (count === 0) {   
            console.log(count + " documents found, adding new document...")
            upsert()
            
        }
        else { console.log(count + " document found, updating...")
        query.exec(callback)
        }
    });
    
    

}// end of [i] loop



    function callback(err, doc) {

        console.log(doc)
        var id = doc[0]._id
        
        account_data.findById(id, function (err, data) {

                var total_pathway = Number(data.total_pathway) + Number(temp.amount)
                
                data.total_pathway = String(total_pathway)
                data.save(function (err) {
                });
        });
        

    } //end function callback


function upsert(){
    var add_new = new account_data({ account: temp.account, currency: temp.currency, taxRate: String(temp.taxRate), total_pathway: String(temp.amount)});
add_new.save(function (err) {
  if (err) // ...
  console.log('saved');
});

 console.log("New entry created"); 

}









// ------- Swarm-Redistribution Algorithm -------------

// script should then run swarm-redistribution algorithm
// and create a blob of unsigned outgoing payments
// and send back to client.resilience.me

// See http://www.resilience.me/videos.html for details

// example: conn.sendText(SWARM_PAYMENTS_BLOB)

        //conn.sendText();
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(8080);

console.log("server listening on port 8080");


