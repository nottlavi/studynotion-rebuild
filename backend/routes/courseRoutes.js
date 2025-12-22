//setting up to get this file ready for routess
const express = require("express");
const router = express.Router();

//importing middleware(s) here
const { verifyJWT } = require("../middlewares/userMiddleware");

//importing cloudinary config here
const cloudinary = require("../config/cloudinary");

//importing the controllers
const {
  createCourse,
  getCourseDetailsById,
} = require("../controllers/courseController");

router.post("/create-course", verifyJWT, createCourse);
router.get("/get-course-by-id/:courseId", getCourseDetailsById);

router.post("/delete-thumbnail", async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(404).json({
        success: false,
        message:
          "no public id for this cloudinary asset found in the request body",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(400).json({
        success: false,
        message: result.result,
      });
    }

    return res.status(200).json({
      success: true,
      message: "asset deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
