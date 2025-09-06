const express = require("express");
const router = express.Router();

const { getAllUserDetails, deleteAccount } = require("../controllers/Profile");
const { auth } = require("../middlewares/auth");

router.get("/getUserDetails", auth, getAllUserDetails);
router.delete("/deleteProfile", auth, deleteAccount);

module.exports = router;
