

var Remote = ripple.Remote

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



var vaultClient = new ripple.VaultClient();



// get stuff from HTML doc, improve this later
document.querySelector("#submit").addEventListener("click", function() {
  var username = document.querySelector("#login_username").value
 var password = document.querySelector("#login_password").value
login(username, password)
  
})



function login(username, password){
vaultClient.loginAndUnlock(username, password, "basicincome.co", send_to_server)//not sure what 3rd argument, device_id, is (vaultclient.js line 138)

function send_to_server(err, data) {
    var BLOB = data
    console.log(BLOB);

    var ws = new WebSocket("wss://server4-40439.onmodulus.net/:443"); 

    ws.onopen = function(){  
                console.log("Socket has been opened!");  
                var SEND = []
                SEND.push({account_id: BLOB.blob.data.account_id})
                SEND.push(BLOB.blob.data.resilience_me)
                ws.send(JSON.stringify(SEND));
                console.log(SEND);
                };
                
    ws.onmessage = function(evt) { 
                var payment = JSON.parse(evt.data)
                console.log("RECEIVED: "+evt.data);
                
                
                send_payment(BLOB.blob.data.account_id, BLOB.secret, payment.account, payment.amount, payment.currency)
                     
                }
                
};//end blob_function()


function send_payment(ACCOUNT_ID, SECRET, destination, amount, currency){

    remote.setSecret(ACCOUNT_ID, SECRET);
    var transaction = remote.createTransaction('Payment', {
      account: ACCOUNT_ID,
      destination: destination,
      amount: {currency: currency, value: String(amount), issuer: ACCOUNT_ID}
    });
    transaction.on('resubmitted', function() {
    });
    transaction.submit(function(err, res) {
         if (err){
        console.log('Error payment: ' + JSON.stringify(err));
         }
         else console.log('Payment sent: ' +JSON.stringify(res))
    });
}//end send_payment()



}//end login()


