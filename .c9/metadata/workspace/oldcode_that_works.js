{"filter":false,"title":"oldcode_that_works.js","tooltip":"/oldcode_that_works.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":62}},"text":"//--- server.resilience.me - a @BitNation #DApp --------------"},{"action":"insertText","range":{"start":{"row":0,"column":62},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":167,"column":0}},"lines":["","//----- Open a websocket for http://client.resilience.me -------","","var ws = require(\"nodejs-websocket\");","","var server = ws.createServer(function (conn) {","    console.log(\"User connected...\");","","    conn.on(\"text\", function (str) {","        console.log(\"Received DATA_BLOB\");","        var DATA_BLOB = JSON.parse(str);","","var ACCOUNT_DATA = DATA_BLOB[0]","var TAX_BLOB = DATA_BLOB[1]","var SENT_BLOB = DATA_BLOB[2]","var ACCOUNT_ID = ACCOUNT_DATA[0].account_id","","","console.log(JSON.stringify(ACCOUNT_DATA))","console.log(JSON.stringify(TAX_BLOB))","console.log(JSON.stringify(SENT_BLOB))","console.log(JSON.stringify(ACCOUNT_ID))","","","","//--- connect to a MongoDB database -----------","","var mongoose = require('mongoose');","var Schema = mongoose.Schema;","","var db = mongoose.connection;","","db.on('error', console.error);","db.once('open', function() {","","});","","","","  ","//---- Define the MongoDB schemas and models:","","// USEFUL LINKS:","// http://docs.mongodb.org/manual/data-modeling/","","// http://docs.mongodb.org/manual/reference/limits/#namespaces","// http://docs.mongodb.org/manual/faq/developers/#are-there-any-restrictions-on-the-names-of-collections","","// http://mongoosejs.com/docs/api.html#query_Query-and","","","var dividend_pathways_schema = new Schema({","    account: String","  , currency: String","  , taxRate: String ","  , total_pathway: String","  ","}, { collection: ACCOUNT_ID });","","var taxRate_upper_limit_schema = new Schema({","     currency: String, ","     taxRate: String, ","     total_amount: String","","}, { collection: ACCOUNT_ID });","","","","var transaction_log_schema = new Schema({","    account: String","  , connected_transactions: {transaction_id: String}","}, { collection: \"transaction_log\" });","","","var account_data = mongoose.model('account_data', dividend_pathways_schema, ACCOUNT_ID);","","var transaction_log = mongoose.model('transaction_log', transaction_log_schema, \"transaction_log\");","","","","mongoose.connect('mongodb://unicorn23:asd123@proximus.modulusmongo.net:27017/gup6umEm');","","","","","//------ feed the data into MongoDB ---------","","// all the data in TAX_BLOB should be fed into dividend_pathways","","// the script below adds all TAX_BLOB elements that already have","// 'account', 'currency', and 'taxRate' entries in MongoDB","","for (var i = 0; i < TAX_BLOB.length; i++) {","","  var amount = TAX_BLOB[i].amount//[i] can´t be assesed within a function","    ","  var query = account_data.find( ACCOUNT_ID, ","        { 'account': String(TAX_BLOB[i].account), 'currency': String(TAX_BLOB[i].currency), 'taxRate': String(TAX_BLOB[i].taxRate) } ","    )","","    // I couldn´t figure out how to use and AND Condition in the query above,","    // the script above returned mutliple documents, have to filter again:","  query.and([{'account': String(TAX_BLOB[i].account)},{ 'currency': String(TAX_BLOB[i].currency)},{ 'taxRate': String(TAX_BLOB[i].taxRate)}])","  ","  // .count() can be used","  //http://mongoosejs.com/docs/api.html#query_Query-count","  ","  // { upsert: true } can be used","  //http://docs.mongodb.org/manual/reference/method/db.collection.update/#upsert-parameter","  // upsert in mongoose, http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate","  ","  // account_data.findOneAndUpdate(query, { $set: { name: 'jason borne' }}, { upsert: true }, callback)","  ","  query.exec(function(err, doc) {","","        var id = doc[0]._id","        ","        ","        account_data.findById(id, function (err, data) {","","                var total_pathway = Number(data.total_pathway) + Number(amount)","                ","                data.total_pathway = String(total_pathway)","                data.save(function (err) {","                });","        });","","","","    })","","","}","","","","// to Darklight: the next script I need is:","// if a database entry does not exist for account, currency, taxRate, new entries should be created","","","","","","","","","// ------- Swarm-Redistribution Algorithm -------------","","// script should then run swarm-redistribution algorithm","// and create a blob of unsigned outgoing payments","// and send back to client.resilience.me","","// See http://www.resilience.me/videos.html for details","","// example: conn.sendText(SWARM_PAYMENTS_BLOB)","","        //conn.sendText();","    });","    conn.on(\"close\", function (code, reason) {","        console.log(\"Connection closed\");","    });","}).listen(8080);","","console.log(\"server listening on port 8080\");","",""]}]}]]},"ace":{"folds":[],"scrolltop":2418.5,"scrollleft":0,"selection":{"start":{"row":112,"column":5},"end":{"row":112,"column":103},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":21,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1414103970639,"hash":"369df99b88055d87eeea55f57cadb9d7e8b92a27"}