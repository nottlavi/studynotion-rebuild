const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token =
      (req.cookies && req.cookies.token) || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }


    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Student") {
      return res.status(401).json({
        message: "the user isnt a student",
        success: false,
      });
    }
    next();
  } catch (err) {
    return req.status(500).json({
      message: "user couldnt be verified",
      success: false,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        message: "the user isnt a admin",
        success: false,
      });
    }
    next();
  } catch (err) {
    return req.status(500).json({
      message: "user couldnt be verified",
      success: false,
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        message: "the user isnt a instructor",
        success: false,
      });
    }
    next();
  } catch (err) {
    return req.status(500).json({
      message: "user couldnt be verified",
      success: false,
    });
  }
};
