const express = require("express");
const router = express.Router();

//importing controllers here
const { signup, verifyEmail, login } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;
