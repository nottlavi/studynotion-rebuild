const mongoose = require("mongoose");

const tempOTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const tempOTP = mongoose.model("tempOTP", tempOTPSchema);
module.exports = tempOTP;
