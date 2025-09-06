const Category = require("../models/Category");
const RatingAndReviews = require("../models/RatingAndReviews");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name for category not entered",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log(categoryDetails);

    return res.status(200).json({
      message: "category created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "cateogry couldnt be created",
      success: false,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    return res.status(200).json({
      success: true,
      message: "showing all cateogires",
      data: allCategories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("printing category id: ", categoryId);

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        populate: "RatingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "this category contains no courses",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    // didnt get this block
    // let differentCategory = await Category.findOne(
    //   categoriesExceptSelected[]
    // )
  } catch (err) {
    return res.status(500).json({
      success: false,
      errorMessage: err.message,
    });
  }
};
