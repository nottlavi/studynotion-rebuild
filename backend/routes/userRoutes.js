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
  getProfileByToken,
  updateProfile,
} = require("../controllers/userController");

//importing the middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
//below three routes for forgot password flow
router.post("/send-otp", sendOTP);
router.post("/check-otp", checkOTP);
router.post("/change-password", changePassword);

//route to access info about a user if they are logged in, in simpler words using token/jwt
router.get("/get-profile", verifyJWT, getProfileByToken);

router.put("/update-profile", verifyJWT, updateProfile);
module.exports = router;
