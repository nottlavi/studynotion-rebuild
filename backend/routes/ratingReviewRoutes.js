const express = require("express");
const router = express.Router();

//importing all the controllers here
const {
  addRatingReview,
  getRatingReview,
} = require("../controllers/ratingReviewController");

//importing middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/add", verifyJWT, addRatingReview);
router.post("/get", verifyJWT, getRatingReview);

module.exports = router;
