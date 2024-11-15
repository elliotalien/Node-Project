const nodemailer = require("nodemailer");

async function MailSender(mailId, html, title) {
  try {
    if (!process.env.USER_AUTHENTICATION_EMAIL || !process.env.USER_AUTHENTICATION_PASSWORD) {
      throw new Error("Email configuration is missing. Please check your environment variables.");
    }

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_AUTHENTICATION_EMAIL,
        pass: process.env.USER_AUTHENTICATION_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.USER_AUTHENTICATION_EMAIL, // Use the same email as auth
      to: mailId,
      subject: title,
      html: html,
    };

    const result = await mailTransporter.sendMail(mailDetails);
    console.log("Email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = MailSender;
