//--- server.resilience.me --------------

//----- Open a websocket for http://client.resilience.me -------

var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");

    conn.on("text", function (str) {
        console.log("Received DATA_BLOB");
        var DATA_BLOB = JSON.parse(str);

var ACCOUNT_DATA = DATA_BLOB[0];
var TAX_BLOB = DATA_BLOB[1];
var SENT_BLOB = DATA_BLOB[2];
var ACCOUNT_ID = ACCOUNT_DATA[0].account_id;


console.log(JSON.stringify(ACCOUNT_DATA));
console.log(JSON.stringify(TAX_BLOB));
console.log(JSON.stringify(SENT_BLOB));
console.log(JSON.stringify(ACCOUNT_ID));



//--- connect to a MongoDB database -----------

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

});



//--- variables

var i = 0;
var k = 0;
  
  
//---- Define the MongoDB schemas and models:

// USEFUL LINKS:
// http://docs.mongodb.org/manual/data-modeling/

// http://docs.mongodb.org/manual/reference/limits/#namespaces
// http://docs.mongodb.org/manual/faq/developers/#are-there-any-restrictions-on-the-names-of-collections

// http://mongoosejs.com/docs/api.html#query_Query-and

    var COLLECTION = String;
    COLLECTION = ACCOUNT_ID;

var dividend_pathways_schema = new Schema({
    account: String
  , currency: String
  , taxRate: String 
  , total_pathway: String

}, { collection: COLLECTION });


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
        i++;
    if(i<TAX_BLOB.length) {
        update_dividend_pathway();

    }
    else SENT_BLOB_loop();

}

function update_dividend_pathway(){

    console.log("Scanning TAX_BLOB"+"["+[i]+"]"+" : " + JSON.stringify(TAX_BLOB[i]));
    
  temp.account = TAX_BLOB[i].account;   
  temp.currency = TAX_BLOB[i].currency;
  temp.taxRate = TAX_BLOB[i].taxRate;
  temp.amount = TAX_BLOB[i].amount;

  // the code below updates db.ACCOUNT_ID.account_data:

  var query = account_data.find( {account: TAX_BLOB[i].account, currency: TAX_BLOB[i].currency, taxRate: (String(TAX_BLOB[i].taxRate))}
  , function(err, doc){
      doc_obj = doc;
    query.count(function(err, count){
      doc_count = count;
something();
    });
    
    function something(){
        if (doc_count > 0) {   
            console.log(doc_count + " documents found:");
            //console.log(doc_obj);
            console.log("updating...");
        var id = doc_obj[0]._id;
        
        account_data.findById(id, function (err, data) {

                var total_pathway = Number(data.total_pathway) + Number(temp.amount);
                
                data.total_pathway = String(total_pathway);
                data.save(function (err) {
                });
        });
        
        update_taxRate_upper_limit();
        }
        
        else { console.log(doc_count + " document found, adding new document...");
          var add_new = new account_data({ account: temp.account, connected_transactions: {transaction_id: String}});
 add_new.save(function (err) {
  if (err) // ...
  console.log('saved');
});

 console.log("New entry created"); 
update_taxRate_upper_limit();
}
    }

  }//end of query.exec
      
      
    );

}// end function update



function update_taxRate_upper_limit(){

    console.log("update_taxRate_upper_limit");
    

  // the code below updates db.TAX_BLOB[i].taxRate_upper_limit:

  var query2 = taxRate_upper_limit.find( {ccurrency: TAX_BLOB[i].currency, ttaxRate: TAX_BLOB[i].taxRate}
  , function(err, doc){
      doc_obj3 = doc;
      //console.log(doc + doc._id);
    query2.count(function(err, count){
      doc_count2 = count;
something();
    });
    
    function something(){
        if (doc_count2 > 0) {   
            console.log(doc_count2 + " taxRate_upper_limit documents found:");
            //console.log(doc_obj3);
            console.log("updating...");
        var id = doc_obj3[0]._id;
        //console.log(doc_obj3[0]._id);
        taxRate_upper_limit.findById(id, function (err, data) {

                var ttotal_amount = Number(data.ttotal_amount) + Number(TAX_BLOB[i].amount);
                
                data.ttotal_amount = String(ttotal_amount);
                data.save(function (err) {
                });
        });
        
        update_transaction_log_with_TAX_BLOB();
        }
        
        else { console.log(doc_count2 + " taxRate_upper_limit document found, adding new document...");
          var add_new = new taxRate_upper_limit({ ccurrency: TAX_BLOB[i].currency, ttaxRate: TAX_BLOB[i].taxRate, ttotal_amount: TAX_BLOB[i].amount});
 add_new.save(function (err) {
  if (err) // ...
  console.log('saved');
});

 console.log("New taxRate_upper_limit entry created"); 
update_transaction_log_with_TAX_BLOB();
}
    }

  }//end of query.exec
      
      
    );

}// end function update






    function update_transaction_log_with_TAX_BLOB() {
        
        var doc_obj;
        var query = transaction_log.find( {account: TAX_BLOB[i].account}
        , function(err, doc){
            
            doc_obj = doc;
            query.count(function(err, count){
                doc_count = count;
                something();
            });
    
            function something(){
                if (doc_count > 0) { 
                     console.log(doc_count + " transaction_logs found");

                    var id = doc_obj[0]._id;
                    //console.log(id);
                    transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: TAX_BLOB[i].transaction_id}}}, function(rawResponse){console.log(rawResponse)}); 
            
    
  
                                       loop();   


                }
                

                else { console.log(doc_count + " transaction_logs found, adding new document...");
                          
                    var add_new = new transaction_log({ account: temp.account, connected_transactions: [{transaction_id: TAX_BLOB[i].transaction_id}]});
                    add_new.save(function (err) {
                    if (err) // ...
                    console.log('saved');
                    });
                
                    console.log("transaction logged"); 
                    
                    loop(); 
                }
            }    

        });
    }

function SENT_BLOB_loop() {
        k++;
    if(k<SENT_BLOB.length) {
        update_transaction_log_with_SENT_BLOB();

    }
    else pingback();

}


    function update_transaction_log_with_SENT_BLOB() {
        
        var doc_obj;
        var query = transaction_log.find( {account: SENT_BLOB[k].destination}
        , function(err, doc){
            
            doc_obj = doc;
            query.count(function(err, count){
                doc_count = count;
                something();
            });
    
            function something(){
                if (doc_count > 0) { 
                     console.log(doc_count + " transaction_logs found");

                    var id = doc_obj[0]._id;
                    console.log(id);
                    transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: SENT_BLOB[k].transaction_id}}}, function(rawResponse){console.log(rawResponse)}); 
            
    
  
                                          


                }
                

                else { console.log(doc_count + " transaction_logs found, adding new document...");
                          
                    var add_new = new transaction_log({ account: temp.account, connected_transactions: [{transaction_id: SENT_BLOB[k].transaction_id}]});
                    add_new.save(function (err) {
                    if (err) // ...
                    console.log('saved');
                    });
                
                    console.log("transaction logged"); 
                    
                }
            }    

        });
            total_amount();

    }







// ------- Pingback last updated TAX_BLOB.transaction_id ------------------------------------

    function pingback() {
        
        var PING_BLOB = { TAX_BLOB_ping: TAX_BLOB[0].transaction_id,
                          SENT_BLOB_ping: SENT_BLOB[0].transaction_id
                        };
                        
                       
        conn.sendText(JSON.stringify(PING_BLOB));
        
    }




//------ total amount per currency
        var IOUs = [];


function total_amount(){
        var temp = " "

    for (var f = 0; f < TAX_BLOB.length; f++) { 
        if(temp.indexOf(TAX_BLOB[f].currency) == -1){
        IOUs.push({currency: TAX_BLOB[f].currency, total_amount: ""});
        temp+= TAX_BLOB[f].currency + " "
        console.log(IOUs);
        }
    }
    var j = 0;
    loop();
    function loop(){
    for (var l = 0; l < TAX_BLOB.length; l++){

        if(TAX_BLOB[l].currency === IOUs[j].currency){
                var temp2 = IOUs[j].total_amount;
                IOUs[j].total_amount = Number(temp2) + Number(TAX_BLOB[l].amount);
                //console.log(IOUs[j].currency + " total_amount: "+IOUs[j].total_amount);
            }
        }
        j++;
        if(j<IOUs.length){loop()}
        else {
            
                console.log("total_amount: "+JSON.stringify(IOUs));
swarm_redistribution();
}
        
        
    }
}


// ------- Swarm-Redistribution Algorithm -------------

// script should then run swarm-redistribution algorithm


// to Darklight: Here, let´s pretty much cut & paste the script @ http://www.resilience.me/swarm_redistributionjs.html

// find dividend_pathway-lines (example: http://www.resilience.me/swarm_redistributionjs.html)



function swarm_redistribution(){

    var lines = [];//lines.push(line)
    
    var x = 0;//recursion()
    var y = 0;//recursion()
   
    var temp = " ";
    
    COLLECTION = ACCOUNT_ID;
    
    dividend_lines();
    
    function dividend_lines() {
        
        console.log("scanning collection: "+ COLLECTION);
    
        var q = 0; //IOUs[q]
    
    
// STEP 1: list all dividend pathways in IOUs[0] for ACCOUNT_ID

    var query = account_data.find({currency: IOUs[q].currency}, function(err, doc) {
        //console.log(doc);
        var w = 0; //doc[w]
        var line = [];//[{account: doc[w].account}]

        loop(doc);
        
        function loop(doc) {
            /*
            console.log(doc);
            console.log(doc[w].account);
            console.log[lines]
            
            console.log("hej" + temp)
            console.log(temp.indexOf(doc[w].account));
            */
            var q = 0
            
            if (temp.indexOf(doc[w].account) == -1){
            temp+= doc[w].account + " "

            line.push({account: doc[w].account});
            q++
            }
            else line.push("[CIRCULAR]");
            
            w++;
            
            if (w<doc.length){loop(doc)}
            else {
                console.log(line);//lists all dividend pathways in IOUs[0] for ACCOUNT_ID
                if (q>0){
                    lines.push(line)
                };
                
                recursion()

            }
        }
        
  
        /*
        console.log("hej" + line)

        console.log(lines);
        */
        
  


    });//end of function(err, doc)


    }//end dividend_lines()
    
      
// STEP 2: recursion (add all dividend pathways for lines[x][i].account)        
// to Darklight: not sure how to do this:
   

    function recursion(){
            if(x<lines.length){
                
        if(y<lines[x].length){
            COLLECTION = lines[x][y].account;
            console.log(COLLECTION)
            y++;
            dividend_lines();
            
        }
                
        else {
           
            console.log("recursion nr "+x)
            
            x++;
            y = 0;
            dividend_lines()
        }
        
            }
            else console.log("END")
        
        /*    
    if(){           
    }
    else console.log("END");
    */
}
         
        
}//end swarm_redistribution()



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

