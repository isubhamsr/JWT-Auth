var nodemailer = require("nodemailer");
 var ejs = require("ejs");
 const mailer = {}
mailer.transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 465,
     secure: true, // use SSL
     auth: {
         user: 'shubhamroy12345@gmail.com',
         pass: 'Roy@12345'
     }
 });

 /*
 
 const data = ejs.render(__dirname + "\\email.ejs", { name: 'Stranger' })
 console.log(data);
 const mainOptions = {
    from: '"Subham" shubhamroy12345@gmail.com',
    to: "shubham.roy021@gmail.com",
    subject: 'Email Verification',
    html: data
}
transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
        console.log(err);
    } else {
        console.log('Message sent: ' + info.response);
        
    }
})
*/
 
/*
 ejs.renderFile( __dirname + "\\email.ejs", { name: 'Stranger' }, function (err, data) {
 if (err) {
     console.log(err);
 } else {
     mailer.mainOptions = {
         from: '"Subham" shubhamroy12345@gmail.com',
         to: "shubham.roy021@gmail.com",
         subject: 'Email Verification',
         html: data
     };
     console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function (err, info) {
         if (err) {
             console.log(err);
         } else {
             console.log('Message sent: ' + info.response);
         }
     }); 
 }
 
 });
 */

 module.exports = mailer;