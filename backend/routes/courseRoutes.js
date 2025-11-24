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

module.exports = router;
