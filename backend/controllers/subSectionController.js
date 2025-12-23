const subSectionModel = require("../models/subSectionModel");

exports.createSubSection = async () => {
  try {
    //fetching details about the subsection/lecture from the request body
    const { title, description, videoUrl, section } = req.body;

    if (!title || !description || !videoUrl || !section) {
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
    });

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
