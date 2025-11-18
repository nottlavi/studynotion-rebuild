const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["Instructor", "Student", "Admin"]
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
