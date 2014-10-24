

// to Darklight: need to figure out how to update an existing file.
var temp = new account_data({ account_id: 'r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY', DIVIDEND_PATWAYS: [{account: 'rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ', data: [{currency: 'USD', data: []}]}] });

// code below is supposed to upsert the data model but needs revision, other ways require database collection
/* 
account_data.update( findquery, updatequery, { upsert: true }, function(err, numberAffected, rawResponse) {
  
  
});


*/



/*.find(callback);
}

function callback(data) {
    var temp = JSON.stringify(data);
    

var id = temp.account._id;



console.log(id);

if (temp.indexOf(TAX_BLOB.currency = -1)) {  
   account_data.update({ _id: id }, { $set: { DIVIDEND_PATWAYS: [{currencies}] }});
}

account_data.update({ _id: id }, { $set: { DIVIDEND_PATWAYS: [{account: 'test'}] }});

    */
    
    // http://mongoosejs.com/docs/api.html#query_Query-elemMatch
// ?



// http://mongoosejs.com/docs/api.html#query_Query-select
query.select('currencies')

query.exec(function (currencies) {
  console.log(JSON.stringify(currencies))
});



var id; //_id for the account being processed

account_data.find(
    { 'account_id': ACCOUNT_DATA[0]} 
).exec(function(data) {
    
        var temp = JSON.stringify(data);
        
        id = temp._id;
});



account_data.find(function(err, account_data) {
  if (err) return console.error(err);
  console.dir(account_data);
});




/*
var amount = TAX_BLOB[i].amount
                                
if (query === undefined) {
    console.log(query) // check the logs. this shows the structure of .find query
    query.select('total_pathway'); // not work. how select total pathway ???
    query.exec(function(value) {

        var total_pathway = Number(value) + Number(amount);
        console.log(value);
        console.log(total_pathway);
        
        // ...and updates the total_pathway
        
        query.select('DIVIDEND_PATHWAYS.currencies.taxRates._id');
        query.exec(function(id) {
        
    account_data.update({ _id: id }, { $set: { 'total_pathway': total_pathway }});
        });
        
    }
);
    

}

else {
 
// this scans the document for a currency value
// if false, jump down to the next script

var query = account_data.find(
    { 'account_id': ACCOUNT_DATA[0], 'DIVIDEND_PATWAYS.account': TAX_BLOB[i].account, 'DIVIDEND_PATWAYS.currencies.currency': TAX_BLOB[i].currency} 
);  

  
if (query !== undefined) {
    query.select('DIVIDEND_PATWAYS.currecies.taxRate.total_pathway');
    query.exec(function(value) {
        var total_pathway = value + TAX_BLOB[i].amount;
    account_data.update({ _id: id }, { $set: { 'DIVIDEND_PATWAYS.currencies.taxRate.total_pathway': total_pathway}});
        
    }
);    
    
}


else {

account_data.update({ _id: id }, { $set: { DIVIDEND_PATWAYS: [{account: 'test'}] }});


}


*/
    
    
    
    // this scans the document for a taxRate value
// if false, jump down to the next script



        var total_pathway

        if (obj.length > 10) {
        query.select('total_pathway')
        query.exec(function(value) {
            console.log(value)
            
            total_pathway = Number(value) + Number(TAX_BLOB[i].amount);

        })
        
        
        
        var id = query.select('DIVIDEND_PATHWAYS.currencies._id')

        account_data.update({ _id: id }, { $set: { 'taxRates.total_pathway': total_pathway }});
    
        };
        
        
             if (obj.length > 10) {
           var temp= JSON.stringify(obj)
           console.log(temp)
           //var id = temp[0].DIVIDEND_PATHWAYS[0].currencies[0].taxRates[0]._id
           //console.log(id)
       }
       
       
         var temp = JSON.stringify(obj)
    console.log(temp.indexOf("taxRates"))
    var test = temp.slice(297, 368)
    
    console.log(test._id)
    console.log(test)
    
    
    
    
function callback(err, doc) {

        console.log(doc)

        var value = 3
        var total_pathway = value + amount
      console.log(total_pathway)
     
    }
    
      amount = TAX_BLOB[i].amount



