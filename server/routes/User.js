const express = require("express");
const router = express.Router();
const { signup, login, verifyEmail } = require("../controllers/User");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

module.exports = router;
