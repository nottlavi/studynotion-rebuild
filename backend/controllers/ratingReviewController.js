const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

exports.addRatingReview = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);

    const { courseId, rating, review } = req.body;

    if (!userId || !courseId) {
      return res.status(404).json({
        success: false,
        message: "missing required fields",
      });
    }

    const user = await userModel.findById(userId).select("-password");
    const course = await courseModel.findById(courseId);

    //this constant here to update the course avg rating and count whenever a user rates
    const oldAverage = course.rating.average;
    const oldCount = course.rating.count;

    //checking if the user is enrolled in the course or not
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "user is not enrolled in the course",
      });
    }

    const ratedCourse = user.ratedCourses.find(
      (course) => course.courseId.toString() === courseId,
    );

    if (!ratedCourse) {
      user.ratedCourses.push({
        courseId: courseId,
        rating: rating,
        review: review,
      });

      await user.save();

      course.rating.average = (oldAverage * oldCount + rating) / (oldCount + 1);
      course.rating.count += 1;

      await course.save();

      return res.status(200).json({
        success: true,
        message: "successfully rated the course",
        user: user,
      });
    }

    const oldUserRating = ratedCourse.rating;

    if (rating !== undefined) {
      ratedCourse.rating = rating;
    }
    if (review !== undefined) {
      ratedCourse.review = review;
    }

    if (rating !== undefined) {
      course.rating.average =
        (oldAverage * oldCount - oldUserRating + rating) / oldCount;
    }

    await user.save();
    await course.save();

    return res.status(200).json({
      success: true,
      message: "course rating updated successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getRatingReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const { courseId } = req.body;

    console.log(courseId, userId);

    if (!userId || !courseId) {
      return res.status(404).json({
        success: false,
        message: "missing required fields",
      });
    }

    const user = await userModel.findById(userId);

    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "the user is not enrolled in this course",
      });
    }

    //finding this particular course in the rated course array of user
    const ratedCourse = user.ratedCourses.find(
      (course) => course.courseId == courseId,
    );

    if (!ratedCourse) {
      return res.status(400).json({
        success: false,
        message: "user hasnt rated the course yet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "course rating details fetched successfully",
      rating: ratedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
