const { default: mongoose } = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    const id = req.user.id;

    const userDetails = await User.findById(id);

    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    (profile.gender = gender),
      (profile.dateOfBirth = dateOfBirth),
      (profile.about = about),
      (profile.contactNumber = contactNumber);

    await profile.save();

    const updatedUserDetails = await User.findById(id)
      .populate(additionalDetails)
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const id = req.user.id;

    const user = await User.findById(id);

    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "couldnt find the user",
      });
    }

    await Profile.findByIdAndDelete(user.additionalDetails);

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnrolled: id } },
        { new: true }
      );
    }

    await CourseProgress.deleteMany({ userID: id });

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "user successfully deleted",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const userDetais = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      message: "successfully fetched user",
      success: true,
      user: userDetais,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "couldnt fetch the user due to internal server error",
    });
  }
};
