const express = require("express");
const router = express.Router();

//importing models here
const { verifyJWT } = require("../middlewares/userMiddleware");

//importing controllers here
const {
  addToCart,
  getCartByUserId,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/add-to-cart", verifyJWT, addToCart);
router.get("/get-cart-by-user-id", verifyJWT, getCartByUserId);
router.put("/remove-from-cart", verifyJWT, removeFromCart);

module.exports = router;
