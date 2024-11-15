const nodemailer = require("nodemailer");

function MailSender(mailId, html, title) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_AUTHENTICATION_EMAIL,
      pass: process.env.USER_AUTHENTICATION_PASSWORD,
    },
  });
  let mailDetails = {
    from: process.env.MAIL_SEND_ADDRESS,
    to: `${mailId}`,
    subject: title,
    html: html,
  };

  mailTransporter.sendMail(mailDetails, (err) => {
    if (err) {
      console.log("erroe while sending the mail", err);
    } else {
      console.log("mail sended succesfully");
    }
  });
}

module.exports = MailSender;
