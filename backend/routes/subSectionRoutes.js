const express = require("express");
const router = express.Router();

//importing controllers here
const {
  createSubSection,
  deleteSubSection,
} = require("../controllers/subSectionController");

//importing middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/create-sub-section", createSubSection);
router.delete("/delete", verifyJWT, deleteSubSection);

module.exports = router;
