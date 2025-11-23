const express = require("express");
const router = express.Router();

// importing the controllers here
const {
  createCategory,
  getCategoryDetailsById,
} = require("../controllers/categoryController");

//importing the middleware here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/create-category", verifyJWT, createCategory);
router.get("/get-category-by-id/:categoryId", getCategoryDetailsById);

module.exports = router;
