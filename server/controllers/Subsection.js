const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;
    const video = req.files.video;

    if ((!sectionId, !title, !timeDuration, !description)) {
      return res.status(404).json({
        success: false,
        message: "all the required entities couldnt be found",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      proccess.env.FOLDER_NAME
    );

    const newSubSection = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({ success: true, data: updatedSection });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "couldnt create a subsection due to an internal server error",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, title, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "couldnt find a subsection with given id",
      });
    }

    if (title !== null || description !== null) {
      (subSection.title = title), (subSection.description = description);
    }

    await subSection.save();

    const updatedSection = await Section.findById({ _id: sectionId }).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "sub section updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "couldnt update sub section due to interal server error",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "couldnt find a sub section with given id",
      });
    }

    await Section.findByIdAndUpdate(
      {
        _id: sectionId,
      },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    );

    const updatedSection = await Section.findByIdAndUpdate(sectionId).populate(
      "subSection"
    );

    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "deleted the subsection",
      data: updatedSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "couldnt delete a subsection due to internal server error",
    });
  }
};
