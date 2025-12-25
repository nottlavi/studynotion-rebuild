const express = require("express");
const router = express.Router();

//importing controllers here
const { createSubSection } = require("../controllers/subSectionController");

router.post("/create-sub-section", createSubSection);

module.exports = router;
