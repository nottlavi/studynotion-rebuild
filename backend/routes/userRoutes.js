const express = require("express");
const router = express.Router();

//importing controllers here
const { signup, verifyEmail, login, logout } = require("../controllers/userController");

//importing the middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);

module.exports = router;
