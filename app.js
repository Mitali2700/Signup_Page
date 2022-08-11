//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(firstName);
    // console.log("\n");
    // console.log(lastName);
    // console.log("\n");
    // console.log(email);

   /* console.log(firstName);
    console.log(lastName);
    console.log(email);  
    */

    const data= {
        members: [
            {
                email_address : email,
                status:"subscribed" ,
                merge_fields :{
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    };

    

});
// we're going to set our web page up with the MailChimp API to start sending this data over to their servers. 


/*
After creating account :
Go to your name then click on "Account"  ->  "Extras"  ->  "API Key"
After clicking on "API key" -> Click on "Create a key"
Now go to "mailchimp.com/developer/"

Now go to:
https://mailchimp.com/developer/marketing/api/batch-operations/

Now go to: List/Audiences
https://mailchimp.com/developer/marketing/api/lists/

Now do this :
https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/

Now go to mailchimp.com  -->  Audience

https://us8.admin.mailchimp.com/lists/settings?id= __<- Unique id

Unique ID - 60ea5ca8d4   //List ID

Now we create our data that we want to post as a JSON.
So, lets create JS Object inside app.post

Now again go to "Audience" section --> "Audience fields and *|MERGE|* tags"

Now convert js to JSON

To make a request
*/


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// 687eca5f53384623bcc65d49e7590f57-us8
// dc0ebebe7317ac4ca1347fd5c4652150-us8

