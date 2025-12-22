//setting up to get this file ready for routess
const express = require("express");
const router = express.Router();

//importing middleware(s) here
const { verifyJWT } = require("../middlewares/userMiddleware");

//importing the
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
