// password to our email account is: cachefood1 
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function shoppingListEmail() {
  // Generate test SMTP service account from ethereal.email
const transporter = await nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cachefooddecisions@gmail.com",
    pass: "ngmeeyczbxccfaip", // naturally, replace both with your real credentials or an application-specific password
  },
});

const mailOptions = {
  from: "cachefooddecisions@gmail.com",
  to: "deftonechris@msn.com",
  subject: "Invoices due",
  text: "Dudes, we really need your money.",
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

shoppingListEmail().catch(console.error);

module.exports = { shoppingListEmail };
