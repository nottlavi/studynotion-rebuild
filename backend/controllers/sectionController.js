const sectionModel = require("../models/sectionModel");

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
