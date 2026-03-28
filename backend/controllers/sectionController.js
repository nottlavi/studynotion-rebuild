const sectionModel = require("../models/sectionModel");
const userModel = require("../models/userModel");
const courseModel = require("../models/courseModel");
const subSectionModel = require("../models/subSectionModel");

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

exports.editSection = async (req, res) => {
  try {
    const { sectionId, newTitle } = req.body;
    const { userId } = req.user;

    console.log(userId, sectionId, newTitle);

    if (!sectionId || !userId || !newTitle) {
      return res.status(400).json({
        success: false,
        message: "all input fields required",
      });
    }

    const section = await sectionModel.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "no such section exists",
      });
    }

    const course = await courseModel.findOne({ sections: sectionId });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "this section is not linked to any course",
      });
    }

    const user = await userModel.findById(userId);

    if (!user.courses.includes(course._id)) {
      return res.status(403).json({
        success: false,
        message: "you do not own this course / section",
      });
    }

    if (newTitle === section.title) {
      return res.status(403).json({
        success: false,
        message: "new and old title cant be the same",
      });
    }

    section.title = newTitle;

    await section.save();

    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      section: section,
    });
  } catch (err) {
    return res.status().json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;
    const { userId } = req.user;

    const section = await sectionModel.findById(sectionId);

    if (!section) {
      return res.status(400).json({
        success: false,
        message: "no such section exists",
      });
    }

    const course = await courseModel.findOne({
      sections: sectionId,
    });

    const user = await userModel.findById(userId);

    if (user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "you are not an instructor",
      });
    }

    if (!user.courses.includes(course._id)) {
      return res.status().json({
        success: false,
        message: "you do not own the section you wish to delete",
      });
    }

    //pulling the section from the course's section array
    await courseModel.findByIdAndUpdate(course._id, {
      $pull: { sections: sectionId },
    });

    //deleting all the sub sections associated with this section
    await subSectionModel.deleteMany({ section: sectionId });

    //deleting the section now
    await sectionModel.deleteOne({ _id: sectionId });

    return res.status(200).json({
      success: true,
      message: "section and its contents deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err,
    });
  }
};
