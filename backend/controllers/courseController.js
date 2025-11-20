const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

//only instructor should access this function
exports.createCourse = async (req, res) => {
  try {
    //from the middleware
    const userId = req.user.userId;

    //finding the user with the above user id, also he will be the owner of the course if he has a accountType "Instructor"
    const user = await userModel.findById(userId);

    //if user isnt a instructor
    if (user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "not authorized to visit this section",
      });
    }

    //else fetching info required to create the course from the request
    const { title } = req.body;

    if(!title) {
      return res.status(404).json({
        success: false,
        message: "all input fields are required"
      })
    }

    //creating the course here
    const newCourse = await courseModel.create({
      title: title,
      instructor: userId,
    });

    //pushing the course in the user's entry
    await userModel.findByIdAndUpdate(userId, {
      $push: { courses: newCourse._id },
    });

    return res.status(200).json({
      success: true,
      message: "course created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
