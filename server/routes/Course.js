const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { createCourse, getCourseDetails } = require("../controllers/Course");

// import category routes
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/auth");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getCourseDetails", getCourseDetails);

// category routes
router.post("/createCategory",upload.none() , auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/categoryPageDetails", categoryPageDetails);

module.exports = router;
