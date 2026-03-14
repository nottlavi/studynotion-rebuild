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

    const user = await userModel.findById(userId);

    //checking if the user is enrolled in the course
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "user is not enrolled in the course",
      });
    }

    const ratedCourse = user.ratedCourses.find(
      (course) => course.courseId.toString() === courseId,
    );

    console.log(ratedCourse);

    if (!ratedCourse) {
      user.ratedCourses.push({
        courseId: courseId,
        rating: rating,
        review: review,
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: "successfully rated the course",
        user: user,
      });
    }

    ratedCourse.rating = rating;
    ratedCourse.review = review;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "course rating updated successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};
