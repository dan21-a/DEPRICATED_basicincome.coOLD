//--- server.resilience.me --------------

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



//--- variables

var i = 0
var k = 0
  
  
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


var taxRate_upper_limit_schema = new Schema({ //define it here where [i] is defined
     ccurrency: String, 
     ttaxRate: String, 
     ttotal_amount: String

}, { collection: TAX_BLOB[i].account });


var transaction_log_schema = new Schema({
    account: String
  , connected_transactions: [{transaction_id: String}]
}, { collection: "transaction_log" });


var account_data = mongoose.model('account_data', dividend_pathways_schema, ACCOUNT_ID);

var transaction_log = mongoose.model('transaction_log', transaction_log_schema, "transaction_log");

var taxRate_upper_limit = mongoose.model('taxRate_upper_limit', taxRate_upper_limit_schema, TAX_BLOB[i].account);


mongoose.connect('mongodb://unicorn23:asd123@proximus.modulusmongo.net:27017/gup6umEm');




//------ feed the data into MongoDB --------------------------------------

// all the data in DATA_BLOB should be fed into MongoDB

// the scripts below need to be beautifyed


var temp = {
    account: "",
    currency: "",
    taxRate: "",
    amount: ""
};

var doc_count;
var doc_count2;

var doc_obj;
var doc_obj3;



if(TAX_BLOB[0].transaction_id !== undefined) {

    update_dividend_pathway();

}

function loop() {
        i++
    if(i<TAX_BLOB.length) {
        update_dividend_pathway()

    }
    else SENT_BLOB_loop()

}

function update_dividend_pathway(){

    console.log("Scanning TAX_BLOB"+"["+[i]+"]"+" : " + JSON.stringify(TAX_BLOB[i]))
    
  temp.account = TAX_BLOB[i].account   
  temp.currency = TAX_BLOB[i].currency
  temp.taxRate = TAX_BLOB[i].taxRate
  temp.amount = TAX_BLOB[i].amount

  // the code below updates db.ACCOUNT_ID.account_data:

  var query = account_data.find( {account: TAX_BLOB[i].account, currency: TAX_BLOB[i].currency, taxRate: (String(TAX_BLOB[i].taxRate))}
  , function(err, doc){
      doc_obj = doc
    query.count(function(err, count){
      doc_count = count
something()
    });
    
    function something(){
        if (doc_count > 0) {   
            console.log(doc_count + " documents found:")
            console.log(doc_obj)
            console.log("updating...")
        var id = doc_obj[0]._id
        
        account_data.findById(id, function (err, data) {

                var total_pathway = Number(data.total_pathway) + Number(temp.amount)
                
                data.total_pathway = String(total_pathway)
                data.save(function (err) {
                });
        });
        
        update_taxRate_upper_limit()
        }
        
        else { console.log(doc_count + " document found, adding new document...")
          var add_new = new account_data({ account: temp.account, connected_transactions: {transaction_id: String}});
 add_new.save(function (err) {
  if (err) // ...
  console.log('saved');
});

 console.log("New entry created"); 
update_taxRate_upper_limit()
}
    }

  }//end of query.exec
      
      
    )

}// end function update



function update_taxRate_upper_limit(){

    console.log("update_taxRate_upper_limit")
    

  // the code below updates db.TAX_BLOB[i].taxRate_upper_limit:

  var query2 = taxRate_upper_limit.find( {ccurrency: TAX_BLOB[i].currency, ttaxRate: TAX_BLOB[i].taxRate}
  , function(err, doc){
      doc_obj3 = doc
      console.log("WTF"+doc + doc._id)
    query2.count(function(err, count){
      doc_count2 = count
something()
    });
    
    function something(){
        if (doc_count2 > 0) {   
            console.log(doc_count2 + " taxRate_upper_limit documents found:")
            console.log(doc_obj3)
            console.log("updating...")
        var id = doc_obj3[0]._id
        console.log(doc_obj3[0]._id)
        taxRate_upper_limit.findById(id, function (err, data) {

                var ttotal_amount = Number(data.ttotal_amount) + Number(TAX_BLOB[i].amount)
                
                data.ttotal_amount = String(ttotal_amount)
                data.save(function (err) {
                });
        });
        
        update_transaction_log_with_TAX_BLOB()
        }
        
        else { console.log(doc_count2 + " taxRate_upper_limit document found, adding new document...")
          var add_new = new taxRate_upper_limit({ ccurrency: TAX_BLOB[i].currency, ttaxRate: TAX_BLOB[i].taxRate, ttotal_amount: TAX_BLOB[i].amount});
 add_new.save(function (err) {
  if (err) // ...
  console.log('saved');
});

 console.log("New taxRate_upper_limit entry created"); 
update_transaction_log_with_TAX_BLOB()
}
    }

  }//end of query.exec
      
      
    )

}// end function update






    function update_transaction_log_with_TAX_BLOB() {
        
        var doc_obj;
        var query = transaction_log.find( {account: TAX_BLOB[i].account}
        , function(err, doc){
            
            doc_obj = doc
            query.count(function(err, count){
                doc_count = count
                something()
            });
    
            function something(){
                if (doc_count > 0) { 
                     console.log(doc_count + " transaction_logs found")

                    var id = doc_obj[0]._id
                    console.log(id)
                    transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: TAX_BLOB[i].transaction_id}}}, function(rawResponse){console.log(rawResponse)}) 
            
    
  
                                       loop()   


                }
                

                else { console.log(doc_count + " transaction_logs found, adding new document...")
                          
                    var add_new = new transaction_log({ account: temp.account, connected_transactions: [{transaction_id: TAX_BLOB[i].transaction_id}]});
                    add_new.save(function (err) {
                    if (err) // ...
                    console.log('saved');
                    });
                
                    console.log("transaction logged"); 
                    
                    loop() 
                }
            }    

        })
    }

function SENT_BLOB_loop() {
        k++
    if(k<SENT_BLOB.length) {
        update_transaction_log_with_SENT_BLOB()

    }
    else pingback()

}


    function update_transaction_log_with_SENT_BLOB() {
        
        var doc_obj;
        var query = transaction_log.find( {account: SENT_BLOB[k].destination}
        , function(err, doc){
            
            doc_obj = doc
            query.count(function(err, count){
                doc_count = count
                something()
            });
    
            function something(){
                if (doc_count > 0) { 
                     console.log(doc_count + " transaction_logs found")

                    var id = doc_obj[0]._id
                    console.log(id)
                    transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: SENT_BLOB[k].transaction_id}}}, function(rawResponse){console.log(rawResponse)}) 
            
    
  
                                          


                }
                

                else { console.log(doc_count + " transaction_logs found, adding new document...")
                          
                    var add_new = new transaction_log({ account: temp.account, connected_transactions: [{transaction_id: SENT_BLOB[k].transaction_id}]});
                    add_new.save(function (err) {
                    if (err) // ...
                    console.log('saved');
                    });
                
                    console.log("transaction logged"); 
                    
                }
            }    

        })
            swarm()

    }







// ------- Pingback last updated TAX_BLOB.transaction_id ------------------------------------

    function pingback() {
        
        var PING_BLOB = { TAX_BLOB_ping: TAX_BLOB[0].transaction_id,
                          SENT_BLOB_ping: SENT_BLOB[0].transaction_id
                        }
                        
                       
        conn.sendText(JSON.stringify(PING_BLOB));
        
    }




//------ total amount per currency
        var IOUs = [];


function swarm(){
    console.log("HAHAHAH")
        var temp232

    for (var f = 0; f < TAX_BLOB.length; f++) { 
        temp232 = JSON.stringify(IOUs)
        if(temp232.indexOf(TAX_BLOB[f].currency === -1)){
        IOUs.push({currency: TAX_BLOB[f].currency, total_amount: ""});
        console.log(IOUs)
        }
    }
    var j = 0
    loop4()
    function loop4(){
    for (var l = 0; l < TAX_BLOB.length; l++){
        console.log("FLOW")
         
        console.log("["+j+"]" + IOUs[j].currency)
        
        if(TAX_BLOB[l].currency === IOUs[j].currency){
                console.log("BAM")
                var temp = IOUs[j].total_amount
                IOUs[j].total_amount = Number(temp) + Number(TAX_BLOB[l].amount)
                console.log("HAHAFHAFH" +IOUs[j].total_amount)
            }
        }
        j++
        if(j>=IOUs.length){loop4()}
        
        
        
    }
    console.log("total_amount: "+JSON.stringify(IOUs))
}


// ------- Swarm-Redistribution Algorithm -------------

// script should then run swarm-redistribution algorithm

    console.log("TAX_BLOB dividend amounts: "+JSON.stringify(IOUs))

// find dividend_pathway-lines (example: http://www.resilience.me/swarm_redistributionjs.html)

function dividend_lines(){
    var q = 0
    
    var query = account_data.find({currency: IOUs[q].currency})
    
    
}



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

