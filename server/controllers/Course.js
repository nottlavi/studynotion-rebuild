const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      courseName,
      courseDescription,
      price,
      whatYouWillLearn,
      instructor,
      category,
    } = req.body;

    // const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !instructor ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    // const instructorDetails = await User.findById(userId, {
    //   accountType: "Instructor",
    // });

    // if (!instructorDetails) {
    //   return res.status(404).json({
    //     message: "couldnt find instructor details",
    //     success: false,
    //   });
    // }

    // const thumbnailImage = await uploadImageToCloudinary(
    //   thumbnail,
    //   process.env.FOLDER_NAME
    // );

    // console.log(thumbnailImage);

    // const theCategory = await Category.findOne({ name: category });
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      category: category
      // tag,
      // thumbnail: thumbnailImage.secure_url,
      // instructions
    });

    // await User.findByIdAndUpdate(
    //   { _id: instructorDetails._id },
    //   {
    //     $push: {
    //       courses: newCourse._id,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );

    // await Category.findByIdAndUpdate(category, {
    //   $push: {
    //     courses: newCourse._id,
    //   },
    // });

    await Category.findByIdAndUpdate(category, {
      $push: {
        courses: newCourse._id,
      }
    })

    return res.status(200).json({
      success: true,
      message: "course created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = req.body;
    const course = await Course.findById({
      _id: courseId,
    }).populate({
      path: "instructor",
      populate: {
        path: "ratingAndReviews",
      },
    });

    return res.status(400).json({
      success: true,
      message: "successfully fetched the course",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "couldnt fetch the course due to internal server erro",
    });
  }
};
