require('dotenv').config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser")
const PORT = 4000;

//middleware
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/form.html")
})

app.post("/", (req,res) => {
    let firstName = req.body.first;
    let emailAddress = req.body.email;
   
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: "adediwuraboluwatife1@gmail.com",
    to: emailAddress,
    subject: "Thanks for registering for the event",
    text: "Hello" + " " + firstName + " " + "Thank you for registering for this event, kindly note that this is just a pratice email😎😎 but i am glad it worked! Thanks."
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully!");
    }
  });
  res.redirect("/registered")
})

app.get("/registered", (req,res) => {
    res.sendFile(__dirname + "/public/thanks.html")
})

app.listen(PORT, () => {
    console.log("App is listening on port 4000")
})
