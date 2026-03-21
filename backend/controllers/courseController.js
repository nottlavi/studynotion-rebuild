const categoryModel = require("../models/categoryModel");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");
const sectionModel = require("../models/sectionModel");
const subSectionModel = require("../models/subSectionModel");
const reviewModel = require("../models/reviewModel");

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

    //else fetching info required to create the course from the request also here category is the name (e.g. web-development, java e.t.c. which are created by the admin)
    const {
      title,
      tags,
      category,
      description,
      price,
      thumbnail,
      benifits,
      requirements,
      sections,
    } = req.body;

    if (
      !title ||
      !category ||
      !tags ||
      !description ||
      !price ||
      !thumbnail ||
      !benifits ||
      !requirements ||
      !sections
    ) {
      return res.status(404).json({
        success: false,
        message: "all input fields are required",
      });
    }

    //finding the category id for which request is received
    const categoryEntry = await categoryModel.findOne({ name: category });

    if (!categoryEntry) {
      return res.status(404).json({
        success: false,
        message: "no such category exists",
      });
    }

    //if i create a new section here.

    //creating the course here
    const newCourse = await courseModel.create({
      title: title,
      instructor: userId,
      tags: tags,
      category: categoryEntry._id,
      description: description,
      price: price,
      thumbnail: thumbnail,
      benifits: benifits,
      requirements: requirements,
      sections: sections,
    });

    //pushing the course in the user's entry
    await userModel.findByIdAndUpdate(userId, {
      $push: { courses: newCourse._id },
    });

    //also pushing this course in the category entry
    categoryEntry.courses.push(newCourse._id);
    await categoryEntry.save();

    return res.status(200).json({
      success: true,
      message: "course created successfully with the following details",
      course: newCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseDetailsById = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(401).json({
        success: false,
        message: "no course id found in the url",
      });
    }

    //finding a course with such id
    const courseEntry = await courseModel
      .findById(courseId)
      .populate("instructor")
      .populate({ path: "sections", populate: { path: "subsections" } })
      .populate("category");
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "no such course found in the db",
      });
    }

    //finally returning the success response
    return res.status(200).json({
      success: true,
      message: "course with following details fetched",
      course: courseEntry,
    });
  } catch (err) {
    return res.status().json({
      success: false,
      message: err.message,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const { userId } = req.user;
    const { courseIds } = req.body;

    if (!userId || !courseIds) {
      return res.status(404).json({
        success: false,
        message: "not enough data to proceed",
      });
    }

    const user = await userModel.findById(userId);

    for (let i = 0; i < courseIds.length; i++) {
      const course = await courseModel.findById(courseIds[i]);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "no such course found",
        });
      }

      if (user.enrolledCourses.includes(course._id)) {
        return res.status(400).json({
          success: false,
          message: "course is already enrolled into",
        });
      }

      await userModel
        .findByIdAndUpdate(
          userId,
          {
            $addToSet: {
              enrolledCourses: courseIds[i],
            },
          },
          { new: true },
        )
        .populate("enrolledCourses");

      await courseModel.findByIdAndUpdate(courseIds[i], {
        $addToSet: {
          enrolledUsers: userId,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "enrolled in the course successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.unEnrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.user;

    if (!courseId || !userId) {
      return res.status(404).json({
        success: false,
        message: "missing imp fields",
      });
    }

    const course = await courseModel.findById(courseId);
    const user = await userModel.findById(userId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "no such course found",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "no such user found",
      });
    }

    if (
      !course.enrolledUsers.some((id) => id.toString() === userId.toString())
    ) {
      return res.status(401).json({
        success: false,
        message: "you are not enrolled in this course",
      });
    }

    //removing the user id from course entry
    await courseModel.findByIdAndUpdate(courseId, {
      $pull: {
        enrolledUsers: userId,
      },
    });

    // removing the course id from user's model
    await userModel.findByIdAndUpdate(userId, {
      $pull: {
        enrolledCourses: courseId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "un enrolled from the course successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.user;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "in-sufficient credentials",
      });
    }

    const user = await userModel.findById(userId);
    const course = await courseModel.findById(courseId);

    if (user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "you are not an instructor",
      });
    }

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "no such course exists in the db",
      });
    }

    if (!user.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "you do not own the course which you wish to delete",
      });
    }

    //removing the course from the entries of the user who have enrolled in this course
    await userModel.updateMany(
      { enrolledCourses: courseId },
      { $pull: { enrolledCourses: courseId } },
    );

    //removing thr course from the the instructors entry
    await userModel.findByIdAndUpdate(userId, { $pull: { courses: courseId } });

    //removing it from the category
    await categoryModel.updateOne(
      { courses: courseId },
      { $pull: { courses: courseId } },
    );

    // deleting all subsections belonging to these sections
    await subSectionModel.deleteMany({ section: { $in: course.sections } });

    // deleting all sections of this course
    await sectionModel.deleteMany({ _id: { $in: course.sections } });

    await reviewModel.deleteMany({ course: courseId });

    await courseModel.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "course deleted successfully",
    });
  } catch (err) {
    console.error("DELETE COURSE ERROR:", err); // 👈 ADD THIS

    return res.status(500).json({
      success: false,
      message: err.message || err,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      price,
      category,
      tags,
      requirements,
    } = req.body.payload;

    const { userId } = req.user;
    console.log(title);

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "insufficient data to proceed with",
      });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "no such course found",
      });
    }

    if (course.instructor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "you are not the creator of the course",
      });
    }

    const categoryEntry = await categoryModel.findOne({ name: category });

    if (title !== undefined) {
      course.title = title;
    }
    if (description !== undefined) {
      course.description = description;
    }
    if (price !== undefined) {
      course.price = price;
    }
    if (tags !== undefined) {
      course.tags = tags;
    }
    if (category !== undefined) {
      course.category = categoryEntry._id;
    }
    if (requirements !== undefined) {
      course.requirements = requirements;
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: "course updated successfully",
      course: course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
