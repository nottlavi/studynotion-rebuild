const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {
  signup,
  login,
  checkOtp,
  changePassword,
} = require("../controllers/Auth");

router.post("/signup", signup);
router.post("/checkOtp", checkOtp);
router.post("/login", login);
router.post("/change-password", auth, changePassword);

module.exports = router;
