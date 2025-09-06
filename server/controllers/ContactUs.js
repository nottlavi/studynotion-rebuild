const { ContactUsEmail } = require("../mail/templates/contactFormRes");
const { mailSender } = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  try {
    const { email, firstName, lastName = "", message, phonenumber, countrycode } = req.body;

    if (!email || !firstName || !message || !phonenumber || !countrycode) {
      return res.status(400).json({
        success: false,
        message: "email, firstName, message, phonenumber and countrycode are required",
      });
    }

    const info = await mailSender(
      email,
      "your query is with us now",
      ContactUsEmail(email, firstName, lastName, message, phonenumber, countrycode)
    );

    if (!info || !info.messageId) {
      return res.status(502).json({
        success: false,
        message: "Failed to send confirmation email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details submitted. Check your email for confirmation.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal Server Error",
    });
  }
};
