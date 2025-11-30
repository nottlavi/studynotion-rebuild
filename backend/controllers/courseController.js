const categoryModel = require("../models/categoryModel");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

//only instructor should access this function
exports.createCourse = async (req, res) => {
  try {
    //from the middleware
    const userId = req.user.userId;

    //finding the user with the above user id, also he will be the owner of the course if he has a accountType "Instructor"
    const user = await userModel.findById(userId);

    //if user isnt a instructor
    if (user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "not authorized to visit this section",
      });
    }

    //else fetching info required to create the course from the request also here category is the name (e.g. web-development, java e.t.c. which are created by the admin)
    const {
      title,
      tags,
      category,
      description,
      price,
      thumbnail,
      benifits,
      requirements,
      sections,
    } = req.body;

    if (
      !title ||
      !category ||
      !tags ||
      !description ||
      !price ||
      !thumbnail ||
      !benifits ||
      !requirements ||
      !sections
    ) {
      return res.status(404).json({
        success: false,
        message: "all input fields are required",
      });
    }

    //finding the category id for which request is received
    const categoryEntry = await categoryModel.findOne({ name: category });

    if (!categoryEntry) {
      return res.status(404).json({
        success: false,
        message: "no such category exists",
      });
    }

    //if i create a new section here.

    //creating the course here
    const newCourse = await courseModel.create({
      title: title,
      instructor: userId,
      tags: tags,
      category: categoryEntry._id,
      description: description,
      price: price,
      thumbnail: thumbnail,
      benifits: benifits,
      requirements: requirements,
      sections: sections,
    });

    //pushing the course in the user's entry
    await userModel.findByIdAndUpdate(userId, {
      $push: { courses: newCourse._id },
    });

    //also pushing this course in the category entry
    categoryEntry.courses.push(newCourse._id);
    await categoryEntry.save();

    return res.status(200).json({
      success: true,
      message: "course created successfully with the following details",
      course: newCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseDetailsById = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(401).json({
        success: false,
        message: "no course id found in the url",
      });
    }

    //finding a course with such id
    const courseEntry = await courseModel
      .findById(courseId)
      .populate("instructor");
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "no such course found in the db",
      });
    }

    //finally returning the success response
    return res.status(200).json({
      success: true,
      message: "course with following details fetched",
      course: courseEntry,
    });
  } catch (err) {
    return res.status().json({
      success: false,
      message: err.message,
    });
  }
};
