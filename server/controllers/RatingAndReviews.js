const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReviews");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "couldnt find a course with the given details",
      });
    }

    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "user had already put a review for this course",
      });
    }

    const ratingReview = await RatingAndReviews.create({
      userId,
      rating,
      review,
      courseId,
    });

    const updateCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview,
        },
      }
    );

    console.log(updateCourseDetails);

    return res.status(200).json({
      success: true,
      message: "successfully creted a review",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
      });
    }

    return res.status(200).json({
      success: true,
      averageRating: 0,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "couldnt get the avg rating due to interal server error",
    });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      message: "all reviews fetched successfully",
      data: allReviews,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "couldnt get all the ratings due to an internal server error",
    });
  }
};
