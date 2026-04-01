const subSectionModel = require("../models/subSectionModel");
const sectionModel = require("../models/sectionModel");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

exports.createSubSection = async (req, res) => {
  try {
    //fetching details about the subsection/lecture from the request body
    const { title, description, videoUrl, section, duration } = req.body;

    console.log(title, description, videoUrl, section, duration);

    if (!title || !description || !videoUrl || !section || !duration) {
      return res.status(404).json({
        success: false,
        message: "all input fields required",
      });
    }

    //creating a sub section here
    const newSubSection = await subSectionModel.create({
      title: title,
      description: description,
      videoUrl: videoUrl,
      section: section,
      duration: duration,
    });

    //pushing this sub section in the section entry to which it belongs
    await sectionModel.findByIdAndUpdate(
      section,
      {
        $push: { subsections: newSubSection._id },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "sub section created successully with the following data",
      data: newSubSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;

    if (!subSectionId) {
      return res.status().json({
        success: false,
        message: "all inputs required",
      });
    }

    const subSection = await subSectionModel.findById(subSectionId);

    if (!subSection) {
      return res.status().json({
        success: false,
        message: "no subsection found with this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "sub section fetched successfully",
      subSection: subSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error in subsection get sub section controller",
      error: err.message,
    });
  }
};

exports.editSubSection = async (req, res) => {
  try {
    const { newName, newDescription, subSectionId } = req.body;
    const { userId } = req.user;

    if ((!newName && !newDescription) || !userId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "all inputs required",
      });
    }

    const subSection = await subSectionModel.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "no such subsection",
      });
    }

    const section = await sectionModel.findOne({ subsections: subSectionId });

    if (!section) {
      return res.status(401).json({
        success: false,
        message: "this sub section is not linked with any section",
      });
    }

    const course = await courseModel.findOne({ sections: section._id });

    if (!course) {
      return res.status(401).json({
        success: false,
        message: "this sub section doesnt belong to any course",
      });
    }

    const user = await userModel.findById(userId);

    if (!user.courses.includes(course._id)) {
      return res.status(403).json({
        success: false,
        message: "you havent created the sub section",
      });
    }

    //updating the details
    if (newName) {
      subSection.title = newName;
    }
    if (newDescription) {
      subSection.description = newDescription;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "sub section updated successfully",
      subsection: subSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;
    const { userId } = req.user;

    if (!subSectionId) {
      return res.status(403).json({
        success: false,
        message: "all inputs required",
      });
    }

    const subSection = await subSectionModel.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "no such subsection",
      });
    }

    const section = await sectionModel.findOne({ subsections: subSectionId });

    if (!section) {
      return res.status(401).json({
        success: false,
        message: "this sub section is not linked with any section",
      });
    }

    const course = await courseModel.findOne({ sections: section._id });

    if (!course) {
      return res.status(401).json({
        success: false,
        message: "this sub section doesnt belong to any course",
      });
    }

    const user = await userModel.findById(userId);

    if (!user.courses.includes(course._id)) {
      return res.status(403).json({
        success: false,
        message: "you havent created the sub section",
      });
    }

    //removing from section enty
    section.subsections.pull(subSectionId);
    await section.save();
    //deleting the subsection
    await subSectionModel.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "sub section deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
