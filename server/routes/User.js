const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyEmail,
  deleteAllUsers,
} = require("../controllers/User");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

//for development purpose only
router.delete("/delete-all-users", deleteAllUsers);

module.exports = router;
