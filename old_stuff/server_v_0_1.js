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
var PAYMENT_BLOB = [];

  
  
//---- Define the MongoDB schemas and models:


    var COLLECTION = ACCOUNT_ID;

var dividend_pathways_schema = new Schema({
    account: String
  , currency: String
  , taxRate: String 
  , total_pathway: String

}, { collection: COLLECTION });
  console.log(TAX_BLOB)
var TEMP = "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ"
if(TAX_BLOB.indexOf("account")>-1 ){TEMP = TAX_BLOB[i].account}

var taxRate_upper_limit_schema = new Schema({ //define it here where [i] is defined
     ccurrency: String, 
     ttaxRate: String, 
     ttotal_amount: String

}, { collection: TEMP });


var transaction_log_schema = new Schema({
    account: String
  , connected_transactions: [{transaction_id: String}]
}, { collection: "transaction_log" });


var account_data = mongoose.model('account_data', dividend_pathways_schema, COLLECTION);

var transaction_log = mongoose.model('transaction_log', transaction_log_schema, "transaction_log");

var taxRate_upper_limit = mongoose.model('taxRate_upper_limit', taxRate_upper_limit_schema, TEMP);


mongoose.connect('mongodb://unicorn23:asd123@proximus.modulusmongo.net:27017/gup6umEm');




//------ feed the data into MongoDB --------------------------------------

// all the data in DATA_BLOB should be fed into MongoDB


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


if(TAX_BLOB.indexOf("transaction_id")>-1 ){

if(TAX_BLOB[0].transaction_id !== undefined) {

    update_dividend_pathway()

}}

function loop() {
            i++;

    if(i<TAX_BLOB.length) {
        update_dividend_pathway();

    }
    else update_transaction_log_with_TAX_BLOB();

}

//--------- first half of loop() --------------------------

function update_dividend_pathway(){

    console.log("Scanning TAX_BLOB"+"["+[i]+"]"+" : " + JSON.stringify(TAX_BLOB[i]));
    

  // the code below updates db.ACCOUNT_ID.account_data:

  var query = account_data.find( {account: TAX_BLOB[i].account, currency: TAX_BLOB[i].currency, taxRate: (String(TAX_BLOB[i].taxRate))}
  , function(err, doc){
    query.count(function(err, count){
        doc_count = count
        something()
    });//end of query.count
        function something(){
        if (doc_count > 0) {   
            console.log(doc_count + " documents found");
            //console.log(doc);
            console.log("updating...");
        var id = doc[0]._id;
        
        account_data.findById(id, function (err, data) {

                var total_pathway = Number(data.total_pathway) + Number(TAX_BLOB[i].amount);
                
                data.total_pathway = String(total_pathway);
                data.save(function (err) {
                });
        });
        
        update_taxRate_upper_limit();
        }
        
        else { console.log(doc_count + " document found, adding new document...");
          var add_new = new account_data({ account: TAX_BLOB[i].account, connected_transactions: {transaction_id: String}});
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

  var query = taxRate_upper_limit.find( {ccurrency: TAX_BLOB[i].currency, ttaxRate: TAX_BLOB[i].taxRate}
  , function(err, doc){
      doc_obj3 = doc;
      //console.log(doc + doc._id);
    query.count(function(err, count){
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
                        loop();

        });
        
        }
        
        else { console.log(doc_count2 + " taxRate_upper_limit document found, adding new document...");
          var add_new = new taxRate_upper_limit({ ccurrency: TAX_BLOB[i].currency, ttaxRate: TAX_BLOB[i].taxRate, ttotal_amount: TAX_BLOB[i].amount});
 add_new.save(function (err) {
  if (err) // ...
  console.log('saved');
});

 console.log("New taxRate_upper_limit entry created"); 
loop();
}
    }

  }//end of query.exec
      
      
    );

}// end function update




//--------- second half of loop() --------------------------


function TAX_BLOB_loop() {
                k++;

    if(k<TAX_BLOB.length) {
        update_transaction_log_with_TAX_BLOB();
    }
    else {
        k = 0
        if(SENT_BLOB[0] !== undefined) {

        update_transaction_log_with_SENT_BLOB();
        }
        else pingback()
    }

}


    function update_transaction_log_with_TAX_BLOB() {
        
        var doc_obj;
        var query = transaction_log.find( {account: TAX_BLOB[k].account}
        , function(err, doc){
            
            doc_obj = doc;
            query.count(function(err, count){
                doc_count = count;
                something();
            });
    
            function something(){
                if (doc_count > 0) { 
                     console.log(doc_count + " TAX_BLOB transaction logs found");

                    var id = doc_obj[0]._id;
                    //console.log(id);
                    transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: TAX_BLOB[k].transaction_id}}}); 
                  //transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: TAX_BLOB[k].transaction_id}}}, function(rawResponse){console.log(rawResponse)}); 

    
  
                                       TAX_BLOB_loop();   


                }
                

                else { console.log(doc_count + " TAX_BLOB transaction logs found, adding new document...");
                          
                    var add_new = new transaction_log({ account: TAX_BLOB[k].account, connected_transactions: [{transaction_id: TAX_BLOB[k].transaction_id}]});
                    add_new.save(function (err) {
                    if (err) // ...
                    console.log('saved');
                    });
                
                    console.log("transaction logged"); 
                    
                    TAX_BLOB_loop(); 
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
                
                //console.log("scanning SENT_BLOB"+"["+k+"]")

                if (doc_count > 0) { 
                     //console.log(doc_count + " SENT_BLOB transaction logs found");

                    var id = doc_obj[0]._id;
                    //console.log(id);
                    transaction_log.update({ _id: id }, { $push:{connected_transactions: {transaction_id: SENT_BLOB[k].transaction_id}}}); 
            
    
                     //SENT_BLOB_loop()
                              pingback()            


                }
                

                else { console.log(doc_count + " SENT_BLOB transaction_logs found, adding new document...");
                          
                    var add_new = new transaction_log({ account: TAX_BLOB[k].account, connected_transactions: [{transaction_id: SENT_BLOB[k].transaction_id}]});
                    add_new.save(function (err) {
                    if (err) // ...
                    console.log('saved');
                    });
                
                    console.log("transaction logged"); 
                    //SENT_BLOB_loop()
                    pingback()
                }
               
            });//end query.count
        });//end query.exec

    }//end update_transaction_log_with_SENT_BLOB()







// ------- Pingback last updated TAX_BLOB.transaction_id ------------------------------------

    function pingback() {
        
        var PING_BLOB = { TAX_BLOB_ping: TAX_BLOB[0].transaction_id,
                          SENT_BLOB_ping: ""
                        };
                 
                 
        if(SENT_BLOB[0] !== undefined) {

        PING_BLOB.SENT_BLOB_ping = SENT_BLOB[0].transaction_id;
        }                
                       
        //conn.sendText(JSON.stringify(PING_BLOB));
                    
        
        total_amount();

    }




//------ total amount per currency
        var IOUs = [];


function total_amount(){
        var temp = " "

    for (var f = 0; f < TAX_BLOB.length; f++) { 
        if(temp.indexOf(TAX_BLOB[f].currency) == -1){
        IOUs.push({currency: TAX_BLOB[f].currency, taxRate: TAX_BLOB[f].taxRate, total_amount: ""});
        temp+= TAX_BLOB[f].currency + " ";
        //console.log(IOUs);
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

function swarm_redistribution(){

    var lines = [];//lines.push(line)
    
    var x = 0;//recursion()
    var y = 0;//recursion()
   
    var temp = " ";
    var taxRate_quota_temp = []
    var taxRate_quota_sum = 0
    
    
    dividend_lines();
    var taxRate_switch = false
    var taxRate_x;
    var taxRate_ratio_x;
    
// ------- FIRST, dividend_lines() and taxRate-ratios -----------------
// see http://www.resilience.me/theory.html



    function dividend_lines() {
        
       
        console.log("scanning collection: "+ COLLECTION);
    
        var q = 0; //IOUs[q]
        
        account_data = mongoose.model('account_data', dividend_pathways_schema, COLLECTION);//to insert new COLLECTION


// STEP 1: list all dividend pathways in IOUs[0] for ACCOUNT_ID
    account_data.find({currency: IOUs[q].currency} ).exec(function(err, doc) {
    
    if(doc.length > 0){

        //console.log(doc);
        var w = 0; //doc[w]
        var taxRate_0 = IOUs[q].taxRate
        var line = [];//[{account: doc[w].account}]

        loop(doc);
        
    }
    else console.log("collection is empty"), recursion()

function loop(doc) {

            var q = 0
            var taxRate_y = doc[w].taxRate
            if(taxRate_switch === false){
             taxRate_x = taxRate_0
             taxRate_ratio_x = 1
            }
            else taxRate_x = taxRate_0
            if(taxRate_y > taxRate_x)taxRate_y = taxRate_x
            var taxRate_ratio_y = Number(taxRate_y) / Number(taxRate_x)
            console.log("taxRate_ratio_x:" +taxRate_ratio_x)
            console.log("taxRate_ratio_y:"+taxRate_ratio_y)
            var taxRate_quota = Number(taxRate_ratio_x) * Number(taxRate_ratio_y)
            console.log("taxRate_quota:"+ taxRate_quota)

            
            if (temp.indexOf(doc[w].account) == -1){
            temp+= doc[w].account + " "

            line.push({account: doc[w].account, currency: IOUs[0].currency, taxRate: doc[w].taxRate, taxRate_quota: taxRate_quota});
            taxRate_quota_temp.push(taxRate_quota)
            taxRate_quota_sum = Number(taxRate_quota_sum) + Number(taxRate_quota)

            q++

            }
            else console.log("CIRCULAR");
            
            w++;
            
            if (w<doc.length){loop(doc)}
            else {
                if (q>0){
                    console.log(line);//lists all dividend pathways in IOUs[0] for ACCOUNT_ID

                    lines.push(line)
                };
                
                recursion()

            }
        }


    });//end of function(err, doc)


    }//end dividend_lines()
    
      
// STEP 2: recursion (add all dividend pathways for lines[x][i].account)        


    function recursion(){
            if(x<lines.length){
            console.log("recursion nr "+x)
        if(y<lines[x].length){
            console.log("taxRate_quota:" +lines[x][y].taxRate_quota)
            taxRate_ratio_x = Number(lines[x][y].taxRate_quota)
            taxRate_x = lines[x][y].taxRate

            COLLECTION = lines[x][y].account;
            y++;
            dividend_lines();
            
        }
                
        else {

           x++;
           y = 0;
            console.log("recursion nr "+x)
            
            dividend_lines()
        }
        
            }
            else console.log(lines), console.log("END"), outgoing_payments()
        

}
         
         
         
         
// ------- SECOND, outgoing payments -----------------
// see http://www.resilience.me/theory.html 
function outgoing_payments(){
         console.log(IOUs[0].total_amount)
         console.log(taxRate_quota_temp)
         console.log(taxRate_quota_sum)
         var total_amount_pie = Number(IOUs[0].total_amount)/taxRate_quota_sum//1.77
         
         // create outgoing payment
         x = 0
         y = 0
         loop()
         function loop(){
            if (x<lines.length){     
                if (y<lines[x].length){
                var payment = { account: lines[x][y].account, currency: lines[x][y].currency,
                amount: total_amount_pie * lines[x][y].taxRate_quota}
                PAYMENT_BLOB.push(payment)
                console.log("payment:" +JSON.stringify(payment))
                y++
                loop()
                }
                else x++
                loop()
            }else console.log(PAYMENT_BLOB), send_payment()
         }
}
        
}//end swarm_redistribution()




function send_payment(){
    console.log("outgoing payments sent !")
            conn.sendText(JSON.stringify(PAYMENT_BLOB));
            
}


// and create a blob of unsigned outgoing payments
// and send back to client.resilience.me

// See http://www.resilience.me/videos.html for details

// example: conn.sendText(SWARM_PAYMENTS_BLOB)

    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(8080);

console.log("server listening on port 8080");

