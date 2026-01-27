const subSectionModel = require("../models/subSectionModel");
const sectionModel = require("../models/sectionModel");

exports.createSubSection = async (req, res) => {
  try {
    //fetching details about the subsection/lecture from the request body
    const { title, description, videoUrl, section } = req.body;

    console.log(title, description, videoUrl, section);

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
