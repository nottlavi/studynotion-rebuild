const express = require("express");
const router = express.Router();

//importing controllers here
const {
  signup,
  verifyEmail,
  login,
  logout,
  sendOTP,
  checkOTP,
  changePassword,
} = require("../controllers/userController");

//importing the middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.post("/send-otp", sendOTP);
router.post("/check-otp", checkOTP);
router.post("/change-password", changePassword);
module.exports = router;
