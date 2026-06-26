const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailSender");
const otpGenerator = require("otp-generator");
const userModel = require("../models/userModel");

exports.verifyJWT = async (req, res, next) => {
  const token =
    req.cookies.jwt ||
    (req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "no token found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }

    req.user = decoded;
    next();
  });
};
