const User = require("../models/User");
const otpGenerator = require("otp-generator");
const { transporter } = require("../services/sendMail");
const Otp = require("../models/OTP");
const OTP = require("../models/OTP");

exports.signup = async (req, res) => {
  try {
    //fetching details for registering
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = req.body;

    //checking if any fields are empty
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(200).json({
        success: false,
        message: "please enter all the details",
      });
    }

    //checking if password and confirm password is same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password do not match",
      });
    }

    //checking if email is already registered
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "the user already exists",
      });
    }

    //generating the otp here
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });

    //mailing the otp here
    const isOtpSent = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "here is your otp",
      text: otp,
    });
    if (isOtpSent) {
      await Otp.deleteOne({ email: email }, { sort: { createdAt: 1 } });

      await Otp.create({
        email,
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
        firstName: firstName,
        lastName: lastName,
        password: password,
        accountType: accountType,
      });
    }

    //do not create the user here but send otp and send it to user

    // success response
    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
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
    //fetching details for login
    const { email, password } = req.body;

    //finding if user exists or not
    const isUser = await User.findOne({
      email: email,
    });

    //if they are not registered
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "this email is not registered with us. please sign up",
      });
    }

    //checking if entered password is correct
    if (isUser.password !== password) {
      return res.status(400).json({
        success: false,
        message: "the entered password is incorrect",
      });
    }

    //sending success message
    return res.status(200).json({
      success: true,
      message: "user logged in",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    //deleting the previous otp from the db

    const matchOtp = await OTP.findOne({ email: email });

    //checking if there is a otp entry in the db with this entered email
    if (!matchOtp) {
      return res.status(400).json({
        success: false,
        message: "couldnt find an OTP entry with this email",
      });
    }

    if (Date.now() > matchOtp.expiresAt) {
      await Otp.deleteOne({ email: email });
      return res.status(400).json({
        success: false,
        message: "the entered otp is expired",
      });
    }

    if (otp !== matchOtp.otp) {
      //checking if entered otp is same as the otp stored in db
      return res.status(400).json({
        success: false,
        message: "incorrect otp entered",
      });
    }

    const newUser = await User.create({
      firstName: matchOtp.firstName,
      lastName: matchOtp.lastName,
      email: matchOtp.email,
      password: matchOtp.password,
      accountType: matchOtp.accountType,
    });

    return res.status(200).json({
      success: true,
      message: "otp matched, creating user now... with the below details",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  //generating the otp here
  const newOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });

  //mailing the otp here
  const isOtpSent = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "here is your otp",
    text: newOtp,
  });

  const oldEntry = OTP.findOneAndUpdate(
    { email: email },
    {
      otp: newOtp,
    }
  );
  if (!oldEntry) {
    return res.status(400).json({
      success: false,
      message: "no entry in OTP model found for this email",
    });
  }

  return res.status(200).json({
    success: true,
    message: "new otp sent",
  });
};

//for development purpose only
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    return res.status(200).json({
      success: true,
      message: "all users successfuly deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
