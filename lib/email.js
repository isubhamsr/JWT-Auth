var nodemailer = require("nodemailer");
const ejs = require("ejs")

// console.log(process.env.MAIL_USER_PASSWORD);
 
 const mailer = {}
mailer.transporter = nodemailer.createTransport({
    pool:true,
     host: 'smtp.gmail.com',
     port: 465,
     secure: true, // use SSL
     auth: {
         user: process.env.MAIL_USER_NAME,
         pass: process.env.MAIL_USER_PASSWORD
     }
 });


mailer.email = function(data, to, callback){
 ejs.renderFile( __dirname + "/email.ejs", data , function (err, data) {
 if (err) {
     console.log("ejs. render ==== > ", err.message);
 } else {
      mailer.transporter.sendMail({
        to, 
        from: '"Subham" shubhamroy12345@gmail.com',
         
         subject: 'Email Verification',
         html: data
     }, function (err, info) {
         if (err) {
             console.log("mail error ==== > ",err.message);
             callback({status : false, message:err.message})
         } else {
             console.log('Message sent ====> ' + info.response);
             callback({status : true, message:info.response})
         }
     }); 
 }
 
 });
}

 module.exports = mailer;