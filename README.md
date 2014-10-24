# server.resilience.me #
### a BitNation DApp ###

A first prototype for server.resilience.me, in javascript.
non-optimized.

client.resilience.me is online on http://client.resilience.me

server.js is deployed on modulus.io + mongoDB

to view logs from server.resilience.me:

```js
$ MODULUS_TOKEN=8874f010-4d89-46ad-b631-a57f2e7f98b4 modulus project logs -p server
```

to test server.js:

```js
node server.js
```

### How to Connect to Resilience.me ###

To use the service Resilience.me provides, you need to share most of your transaction data. 

http://client.resilience.me gives Ripple.com users the ability to connect to Resilience.me.

Resilience.me works with any financial provider, but only Ripple.com has a client as of Oct 21 2014.


** DATA_BLOB ** 

The transaction data from client.resilience.me is sent over websocket.

The `DATA_BLOB` contains three arrays.

```js
ACCOUNT_DATA = [{'account_id': ""}]
TAX_BLOB = [{'transaction_id': "", 'account': "", 'amount': "", 'currency': "", 'destination': "", 'taxRate':  'tax_amount': }]
SENT_BLOB = [{'transaction_id': "",'destination': "",'currency': "",'amount': ""}]
```


`ACCOUNT_DATA` sends the accounts ripple adress, and possible extra data like email and arbitrary data.

`TAX_BLOB` sends all declared tax, this is the main blob.

`SENT_BLOB` sends all outgoing payments. to keep track of non-taxed transactions.




** example of a  DATA_BLOB:**

```js
 

    [
  [
    {
      "account_id": "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ"
    }
  ],
  [
    {
      "transaction_id": "FF2941370F0845EE15B4D80A3B4297A4A9DEC1B22AD6BF871B3B8F0437D2BC1C",
      "account": "r3DbjmNpTAKCLHTBnb1rGh5dVtjULZHURe",
      "amount": "400",
      "currency": "RES",
      "destination": "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ",
      "taxRate": 0.04,
      "tax_amount": 16
    },
    {
      "transaction_id": "6866A019DE3259D81AB98A2E0235DF59E860EBDE1903F59871B044CD882AF320",
      "account": "r3DbjmNpTAKCLHTBnb1rGh5dVtjULZHURe",
      "amount": "20",
      "currency": "USD",
      "destination": "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ",
      "taxRate": 0.004,
      "tax_amount": 0.08
    },
    {
      "transaction_id": "2C850D00973E9BB3636BE40C1DEB6690E4B51130DEB01C78817972A7BD3F4AF1",
      "account": "rhtk5T8AMHELGhn16hHVtLWK3Cit1owHqW",
      "amount": "200",
      "currency": "RES",
      "destination": "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ",
      "taxRate": 0.04,
      "tax_amount": 8
    }
  ],
  [
    {
      "transaction_id": "D0091785AC1AEDC711B7A02FF6C3D5ED414538D15FECA39BD6643EDFF3198E8B",
      "destination": "r3DbjmNpTAKCLHTBnb1rGh5dVtjULZHURe",
      "currency": "EUR",
      "amount": "40"
    },
    {
      "transaction_id": "AF7AB2E40E43FF9870D23EB35B03F64ED17C172EDCBE2F24FDB855D05CA40750",
      "destination": "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY",
      "currency": "RES",
      "amount": "20"
    },
    {
      "transaction_id": "DF7BC392895131F76EA897B05251D9838DF5AA64FE4078A692C70741020265F9",
      "destination": "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY",
      "currency": "SEK",
      "amount": "200"
    },
    {
      "transaction_id": "30384C94E4032792C57A20C2B018A323CA0746A796B237F497E3003A9AA22B30",
      "destination": "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY",
      "currency": "USD",
      "amount": "10"
    },
    {
      "transaction_id": "E0D4DE034865D2FC1501ADDF8F91DB37FF3305EFC051416527496B9C07B8275E",
      "destination": "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY",
      "currency": "BTC",
      "amount": "400"
    }
    
  ]
] 
    
```

## MongoDB Database ##

the DATA_BLOB data needs to be added to a database.

The structure of the database is:

**Schema 1**

```js
ACCOUNT_ID (one file per resilience.me-connected account)
     |
  ___|____________________________________
  |                                      |
DIVIDEND_PATWAYS              TAXRATE_UPPER_LIMIT
  |            |                  |             |
account    (branch)            currency      (branch)   
  |            |                  |             |
currency   (branch)            taxRate      (branch)   
  |            |                  |             |
taxRate    (branch)          total_amount   total_amount
  |            |
total_pathway  |
               |
            total_pathway
  
```

the data in `DIVIDEND_PATWAYS` comes from the users `TAX_BLOB`
the data in `TAXRATE_UPPER_LIMIT` comes from other users `TAX_BLOB`, and from non-connected transactions in a users `SENT_BLOB`



**Schema 2**

```js
CONNECTED_TRANSACTIONS (one big file. logs all transactions that have been connected to resilience.me)
      |
  ____|_________________________
  |               |            |
  |               |            |
account        (branch)     (branch)
  |               |            |
transaction_id (branch)     (branch)
transaction_id
transaction_id
transaction_id
transaction_id
transaction_id
```


If a `transaction_id` in `SENT_BLOB` is not in `CONNECTED_TRANSACTIONS` then that transaction is added to `TAXRATE_UPPER_LIMIT`.