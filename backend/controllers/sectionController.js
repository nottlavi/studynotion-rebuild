const sectionModel = require("../models/sectionModel");
const userModel = require("../models/userModel");
const courseModel = require("../models/courseModel");

exports.createSection = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(404).json({
        success: false,
        message: "section heading required",
      });
    }

    const newSection = await sectionModel.create({
      title: title,
    });

    return res.status(200).json({
      success: true,
      message: "section created successfully with following data",
      new_section: newSection,
    });
  } catch (err) {
    return res.status().json({
      success: false,
      message: err,
    });
  }
};

exports.createSectionWithCourseId = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    const { userId } = req.user;

    console.log(courseId);

    if (!courseId || !title) {
      return res.status().json({
        success: false,
        message: "all input fields required",
      });
    }

    const user = await userModel.findById(userId);

    if (user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "you are not an instructor",
      });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course doesnt exist in the database",
      });
    }

    const newSection = await sectionModel.create({
      title: title,
    });

    course.sections.push(newSection._id);

    await course.save();

    return res.status(200).json({
      success: true,
      message: "section created successfully",
      course: course,
      section: newSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
