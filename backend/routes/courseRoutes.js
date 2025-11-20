//setting up to get this file ready for routess
const express = require("express");
const router = express.Router();

//importing middleware(s) here
const { verifyJWT } = require("../middlewares/userMiddleware");

//importing the
const { createCourse } = require("../controllers/courseController");

router.post("/create-course", verifyJWT, createCourse);

module.exports = router;