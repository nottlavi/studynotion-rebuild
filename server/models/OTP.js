const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  // store as string to preserve leading zeros
  otp: { type: String, required: true },
  // proper TTL index for 5 minutes
  createdAt: { type: Date, default: Date.now, expires: 60 * 5 },
});

module.exports = mongoose.model("OTP", otpSchema);
