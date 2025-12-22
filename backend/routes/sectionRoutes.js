const express = require("express");
const router = express.Router();

//importing controllers here
const { createSection } = require("../controllers/sectionController");

//importing middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/create-section", verifyJWT, createSection);

module.exports = router;
