const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const { route } = require("../routes/Course");
const { mailSender } = require("../utils/mailSender");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = req.body;

    if (
      (!firstName, !lastName, !email, !password, !confirmPassword, !accountType)
    ) {
      return res.status(400).json({
        success: false,
        message: "all the details not entered",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "the user is already registered with us",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password fields do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    console.log("printing hashed password here: ", hashedPassword);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
    });

    return res.status(200).json({
      success: true,
      message: "the user is successfully created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "enter all the values",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered, please sign up",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "user logged in",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "the entered password is incorrect",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.checkOtp = async (req, res) => {
  try {
    const { otp, email, firstName, lastName, password, cnfrmPassword, role } =
      req.body;

    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "couldnt fetch otp or email from the body",
      });
    }

    const result = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "the object for this particular email is empty",
      });
    }

    if (result[0].otp == otp) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType: role,
        additionalDetails: profileDetails,
        image: "",
      });

      return res.status(200).json({
        success: true,
        message: "the user is registered now",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "the otps do not match",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "couldnt find a logged in user",
      });
    }

    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "passwords do not match / you have entered the wrong password",
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: encryptedPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "your password has been updated successfully",
    });
  } catch (err) {
    console.error("Error occurred while updating password:", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: err.message,
    });
  }
};
