const express = require("express");
const router = express.Router();

//importing controllers here
const {
  createSubSection,
  deleteSubSection,
  getSubSection,
  editSubSection,
} = require("../controllers/subSectionController");

//importing middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/create-sub-section", createSubSection);
router.get("/get/:subSectionId", getSubSection);
router.put("/edit", verifyJWT, editSubSection);
router.delete("/delete", verifyJWT, deleteSubSection);

module.exports = router;
