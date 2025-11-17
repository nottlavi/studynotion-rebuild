//importing models here
const userModel = require("../models/userModel");
const OTPModel = require("../models/OTPModel");

//importing dependencies here
const otpGenerator = require("otp-generator");
const { sendMail } = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    //fetching all the imp details from the req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(400).json({
        error: "all inputs details not found",
      });
    }

    //checking if password and confirm password do not match
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "password and confirm password do not match",
      });
    }

    //checking if user in already present in th db
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        error: "user already exists. please log in",
      });
    }

    //hashing the password here
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating otp to be sent here
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //sending the mail here
    const isMailSent = await sendMail(
      email,
      "verification otp",
      `here is your otp: ${otp}`,
      ""
    );

    if (isMailSent) {
      //deleting a otp model with this email, so that only one otp exists in the db for one email
      await OTPModel.findOneAndDelete({ email: email });
      const newOTPModel = await OTPModel.create({
        email: email,
        otp: otp,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        accountType: accountType,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      return res.status(200).json({
        success: true,
        message: `otp, ${otp} sent to ${email} `,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    //fetching imp details from the client
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        error: "enter all the required info",
      });
    }

    //finding if such entry exists in the otp model
    const existingEntry = await OTPModel.findOne({ email: email });
    if (!existingEntry) {
      return res.status(400).json({
        error: "no entry for this email found",
      });
    }

    //matching the otps here
    if (existingEntry.otp !== otp) {
      return res.status(400).json({
        error: "incorrect otp entered",
      });
    }

    //checking if otp has already been expired
    if (existingEntry.expiresAt < Date.now()) {
      return res.status(400).json({
        error: "entered otp is expired",
      });
    }

    //creating the user entry here
    const newUser = await userModel.create({
      firstName: existingEntry.firstName,
      lastName: existingEntry.lastName,
      email: existingEntry.email,
      password: existingEntry.password,
      accountType: existingEntry.accountType,
    });

    //deleting the user from otp model
    await OTPModel.deleteOne({ email: email });

    const userObj = newUser.toObject();
    delete userObj.password;

    return res.status(200).json({
      message: "user created successfully",
      userObj,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  //fetching all the imp fields
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "please fill all the required fields",
      });
    }

    //checking if the user exists in the db
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        error: "no such user exist in the db",
      });
    }

    //matching the password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "password incorrect",
      });
    }

    //generating the token here
    const payload = {
      userId: existingUser._id,
      email: existingUser.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      //change this in production
      secure: false,
      path: "/",
      sameSite: "none",
    });

    //returning response here
    return res.status(200).json({
      message: "user logged in",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  const userId = req.user.userId;

  
}