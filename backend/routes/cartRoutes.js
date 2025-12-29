const express = require("express");
const router = express.Router();

//importing models here
const { verifyJWT } = require("../middlewares/userMiddleware");

//importing controllers here
const { addToCart } = require("../controllers/cartController");

router.post("/add-to-cart", verifyJWT, addToCart);

module.exports = router;
