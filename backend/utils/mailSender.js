const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  logger: true,
  debug: true,
});

exports.sendMail = async (email, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      text: String(text),
      html: html || undefined,
    });

    return true;
  } catch (err) {
    console.log("MAIL ERROR");
    console.log(err);
  }
};
