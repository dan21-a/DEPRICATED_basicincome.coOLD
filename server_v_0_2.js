November 15 2014

// ---------------------------- connect to ripple-lib -----------------------------

/* Loading ripple-lib with Node.js */
var Remote = require('ripple-lib').Remote;


var remote = new Remote({
  // see the API Reference for available options
  servers: [ 'wss://s1.ripple.com:443' ]
});

remote.connect(function() {
  /* remote connected */
  remote.requestServerInfo(function(err, info) {
    // process err and info
  });
});



// ---------------------------- connect to mongoDB -----------------------------

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

});

var COLLECTION = "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ"

var dividend_pathways_schema = new Schema({
    type: String,
    account: String
  , currency: String
  , taxRate: String 
  , total_pathway: String

}, { collection: COLLECTION });

var dividend_pathway = mongoose.model('dividend_pathway', dividend_pathways_schema, COLLECTION);

var wallet_schema = new Schema({
    type: String,
    currency: String, 
    taxRate:String

}, { collection: COLLECTION });

var wallet = mongoose.model('wallet', wallet_schema, COLLECTION);

var tax_blob_schema = new Schema({
    type: String,
    currency: String, 
    total_amount:String

}, { collection: COLLECTION });

var tax_blob = mongoose.model('tax_blob', tax_blob_schema, COLLECTION);


var accounts = []

    function get_collections(){
       mongoose.connection.db.collectionNames(function (err, names) {
            for(var i=0;i<names.length;i++){
                if(names[i].name.length===46)
                accounts.push(names[i].name.slice(12,46))
            }
                request_subscribe()
    })
    }

mongoose.connect('mongodb://AwSZome:jn0903@ds059907.mongolab.com:59907/awesome_box');
mongoose.connection.once('open', function(){ get_collections()})



// ---------------------------- connect to basicincome.co -----------------------------


var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");


    var BLOB
    var ACCOUNT_ID
    var WALLET
    
    var i = 0   


    conn.on("text", function (str) {
        
        function do_something(){}
        
        console.log("Received: "+str);
        BLOB = JSON.parse(str)
        ACCOUNT_ID = BLOB[0].account_id
        WALLET = BLOB[1]

        COLLECTION = ACCOUNT_ID
        wallet = mongoose.model('wallet', wallet_schema, COLLECTION);//reloads COLLECTION

// ---------------------------- swarm-redistribution ----------------------------------

        tax_blob = mongoose.model('tax_blob', tax_blob_schema, COLLECTION);

        tax_blob.find({type: "tax_blob"}, function(err,doc){console.log(doc)})



// ---------------------------- update currency/taxRate ----------------------------------

        

        // update wallet
        wallet.remove({ type: 'wallet' },function(err, wallet){})
        loop()
        function loop(){
                    new wallet({ type: "wallet", currency: WALLET[i].currency, taxRate: WALLET[i].taxRate }).save(function(err){});
                    i++
                    if(i<WALLET.length){loop()}
                    else{(i=0)
                    if(accounts.indexOf(ACCOUNT_ID)===-1){get_collections}//add collection to request_subscribe()
}
        }
        
        
        
    })
}).listen(8080); console.log("server listening on port 8080");




// ---------------------------- connect to rippled -----------------------------

function request_subscribe(){

var req = remote.request_subscribe();
req.message.accounts = accounts
req.request();
remote.on('transaction', function(data){
 


// ---------------------------- connect transactions -----------------------------

console.log(data.transaction)

    COLLECTION = data.transaction.Destination
    dividend_pathway = mongoose.model('dividend_pathway', dividend_pathways_schema, COLLECTION);
    wallet = mongoose.model('wallet', wallet_schema, COLLECTION);//reloads COLLECTION
    tax_blob = mongoose.model('tax_blob', tax_blob_schema, COLLECTION);

    var query = wallet.findOne({type: "wallet", currency: data.transaction.Amount.currency})

        
        query.exec(function(err,doc){
            var taxRate;
            if(doc === null){taxRate = 0}
            else taxRate = doc.taxRate
        var query = dividend_pathway.findOne({type: "dividend_pathway", account: data.transaction.Account, currency: data.transaction.Amount.currency, taxRate: taxRate})
        query.exec(function(err,doc){
                console.log(doc)
            query.count(function(err, count){
                    if(count > 0){
                    doc.total_pathway = Number(doc.total_pathway) + Number(data.transaction.Amount.value)
                    doc.save(function (err) {
                    });
                    }
                    else{
                    var add_new = new dividend_pathway({ type: "dividend_pathway", account: data.transaction.Account, currency: data.transaction.Amount.currency, taxRate: taxRate, total_pathway: data.transaction.Amount.value});
                    add_new.save(function (err) {
                    });
                    }
            })
        })           
    });

var tax_blobQuery = tax_blob.findOne({type: "tax_blob", currency: data.transaction.Amount.currency})
    tax_blobQuery.exec(function(err,doc){
            if(doc === null){
                var add_new = new tax_blob({ type: "tax_blob", currency: data.transaction.Amount.currency, total_amount: data.transaction.Amount.value});
                add_new.save()
            }
            else{
                doc.total_amount = Number(doc.total_amount) + Number(data.transaction.Amount.value)
            
                doc.save()
            }
    })


})//end remote.on
}//end request_subscribe()

