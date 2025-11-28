//importing models here
const userModel = require("../models/userModel");
const OTPModel = require("../models/OTPModel");
const tempOTPModel = require("../models/tempOTPModel");
const profileModel = require("../models/profileModel");

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

    //creating a profile for this user
    const profile = await profileModel.create({});

    //creating the user entry here
    const newUser = await userModel.create({
      firstName: existingEntry.firstName,
      lastName: existingEntry.lastName,
      email: existingEntry.email,
      password: existingEntry.password,
      accountType: existingEntry.accountType,
      profile: profile._id,
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
      sameSite: "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
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
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "cookie cleared",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//flow for forgotten password: send otp -> check otp -> change password
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      success: false,
      message: "entering email is required",
    });
  }

  //checking if user with this email exists
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "no such user exists in the db with this email",
    });
  }

  //generating the otp here
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
    "otp for verification",
    `here is your otp: ${otp}`
  );

  if (isMailSent) {
    //checking if existing entry is present for this email?
    await tempOTPModel.findOneAndDelete({ email: email });

    //creating a new entry in temp otp model to use is later on and to check if its expired or not
    await tempOTPModel.create({
      email: email,
      otp: otp,
      expiresAt: Date.now() + 3 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
    });
  }
};

exports.checkOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "all input fields are required",
      });
    }

    //finding the temp otp entry in the db for this email
    const existingOTP = await tempOTPModel.findOne({ email: email });

    //checking if entered otp is correct
    if (existingOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "entered otp is incorrect",
      });
    }
    //checking if the db otp is expired

    if (existingOTP.expiresAt < Date.now()) {
      return res.status(500).json({
        success: false,
        message: "otp has expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user verified",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "all input fields are required",
      });
    }

    //hashing the password to make it secure
    const hashedPassword = await bcrypt.hash(password, 10);

    //finding the user and updating their password
    await userModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getProfileByToken = async (req, res) => {
  try {
    //fetching user id from the jwt middleware
    const userId = req.user.userId;

    //fetching the user from the db
    const user = await userModel
      .findById(userId)
      .select("-password")
      .populate("courses")
      .populate("profile");

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "middleware authentication failed",
      });
    }

    const updates = {};

    if (req.body.firstName) updates.firstName = req.body.firstName;
    if (req.body.lastName) updates.lastName = req.body.lastName;
    if (req.body.dob) updates.dob = req.body.dob;
    if (req.body.gender) updates.gender = req.body.gender;
    if (req.body.contactNumber) updates.contactNumber = req.body.contactNumber;
    if (req.body.about) updates.about = req.body.about;

    const userToUpdate = await userModel.findById(userId);

    const profileToUpdateId = userToUpdate.profile;

    if (updates.contactNumber && updates.contactNumber.length !== 10)
      return res
        .status(400)
        .json({ success: false, message: "please enter a valid phone number" });

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    const updatedProfile = await profileModel.findByIdAndUpdate(
      profileToUpdateId,
      {
        $set: updates,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "user updated successfully with the following details",
      user: updatedUser,
      profile: updatedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "all input fields are required",
      });
    }

    const user = await userModel.findById(userId);

    //comparing the password here
    const compare = await bcrypt.compare(currentPassword, user.password);

    if (!compare) {
      return res.status(400).json({
        success: false,
        message: "incorrect password enteret",
      });
    }

    //hashing the new password entered and storing it in the db
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
