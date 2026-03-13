const express = require("express");
const router = express.Router();

//importing all the controllers here
const { addRatingReview } = require("../controllers/ratingReviewController");

//importing middlewares here
const { verifyJWT } = require("../middlewares/userMiddleware");

router.post("/add-rating-review", verifyJWT);
