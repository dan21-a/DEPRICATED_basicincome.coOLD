
// ------- Swarm-Redistribution Algorithm -------------

// script should then run swarm-redistribution algorithm

function swarm_redistribution(){

    var lines = [];//lines.push(line)
    
    var x = 0;//recursion()
    var y = 0;//recursion()
   
    var temp = " ";
    
    dividend_lines();
    
    
// ------- FIRST, dividend_lines() -----------------

    function dividend_lines() {
        
       
        console.log("scanning collection: "+ COLLECTION);
    
        var q = 0; //IOUs[q]
        
        account_data = mongoose.model('account_data', dividend_pathways_schema, COLLECTION);//to insert new COLLECTION


// STEP 1: list all dividend pathways in IOUs[0] for ACCOUNT_ID
    account_data.find({currency: IOUs[q].currency} ).exec(function(err, doc) {
    
    if(doc.length > 0){

        //console.log(doc);
        var w = 0; //doc[w]
        var line = [];//[{account: doc[w].account}]

        var test = {account: "", taxRate_quota: ""}
        loop(doc);
        
    }
    else console.log("collection is empty"), recursion()

function loop(doc) {

            var q = 0
            
            if (temp.indexOf(doc[w].account) == -1){
            temp+= doc[w].account + " "

            line.push({account: doc[w].account});
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
                
        if(y<lines[x].length){
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
            else console.log(lines), console.log("END")
        

}
         
         
         
         
// ------- SECOND, taxRate-ratios -----------------
// see http://www.resilience.me/theory.html
         
         
        
}//end swarm_redistribution()



