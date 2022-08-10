const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "views"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

const mailOptions = {
  from: "cachefooddecisions@gmail.com",
  to: "deftonechris@msn.com",
  subject: "Invoices due",
  text: "Dudes, we really need your money.",
  template: "email",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});


