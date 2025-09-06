const { default: mongoose } = require("mongoose");
const { instance } = require("../config/Razorpay");
const Course = require("../models/Course");
const User = require("../models/User");

exports.capturePayments = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "please provide course id ",
    });
  }

  const uid = new mongoose.Types.ObjectId(userId);

  const options = {
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "could not initiate order",
    });
  }
};
