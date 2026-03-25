const express = require("express");
const router = express.Router();

//importing controllers here
const {
  createSection,
  createSectionWithCourseId,
} = require("../controllers/sectionController");

//importing middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/create-section", verifyJWT, createSection);
router.post("/create/course-id", verifyJWT, createSectionWithCourseId);

module.exports = router;
