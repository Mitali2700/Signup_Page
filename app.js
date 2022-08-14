//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/signup.html");
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

    var data= {
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

    // Now we should convert this JS Object into "flatpack JSON"

    const jsonData = JSON.stringify(data);

    //Creating https request
    const url ="https://us8.api.mailchimp.com/3.0/lists/60ea5ca8d4";
    const options ={
        method: "POST",
        auth:"manu1:c3d43bc8d8d62917b22551a891935cce-us8", // Its region (which is us8) should match with url (which is us8))


    }
    
    const request = https.request(url,options, function(response){
        if(response.statusCode === 200){
            //res.send("Succesfully subscribed!");
            //res.sendFile(__dirname + "/success.html");
            res.sendFile(__dirname + "/failure.html");
        }else{
            //res.send("There was an error with signing up, please try again");
            //res.sendFile(__dirname + "/failure.html");
            res.sendFile(__dirname + "/success.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
request.end();
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

Create constant for https module :  https://mailchimp.com/developer/marketing/docs/fundamentals/#Code_examples
'https://usX.api.mailchimp.com/3.0/lists/"listid"'
replace X with the no,. that you have in your APU key after us


After adding method and auth we are ready to generate http request.
*/


//by clicking on button it will redirect to home page.
app.post("/failure", function(req, res){
    res.redirect("/")
})

// Here we are using local port
/*
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
*/

// DYNAMIC PORT
app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000");
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
 
// app.listen(port, function() {
//   console.log("Server started succesfully");
// });   
// So by changing our port to this, it'll allow us to work seamlessly with their system.But the problem is that if we try to run this app now locally using localhost, then our computer won't.
// So for running our web site locally and dynamically we use or 3000



//API Key
//  c3d43bc8d8d62917b22551a891935cce-us8
//List ID or Unique ID 
//60ea5ca8d4

