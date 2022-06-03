const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require ('node:https');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  // console.log(firstName,lastName,email);

  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/aa7135bf7c";

  const options = {
    method :"POST",
    auth : "Sk:2a2d3df8e37b397b33a797e8aa83abce-us9"
  }

  const request = https.request(url,options,function(response){
    console.log(response.statusCode);
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }



    response.on("data",function(data){
      const rdata = JSON.parse(data);

    });
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure',(req,res)=>{
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at port 3000");
});


// apikey:2a2d3df8e37b397b33a797e8aa83abce-us9
// audience id : aa7135bf7c
