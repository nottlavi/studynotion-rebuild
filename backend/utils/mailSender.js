const axios = require("axios");

exports.sendMail = async (email, subject, text, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.MAIL_SENDER,
        },

        to: [
          {
            email: email,
          },
        ],

        subject: subject,

        textContent: String(text),

        htmlContent: html || undefined,
      },

      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      },
    );

    console.log("MAIL SENT SUCCESSFULLY");
    console.log(response.data);

    return true;
  } catch (err) {
    console.log("MAIL ERROR");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }

    return false;
  }
};
