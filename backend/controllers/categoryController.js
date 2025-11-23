const categoryModel = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const email = req.user.email;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "route is exclusive to the admin only",
      });
    }

    //i think only postman's requests will be required here
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({
        success: false,
        message: "you must name a category",
      });
    }

    //creating a category
    const category = await categoryModel.create({
      name: name,
    });

    return res.status(200).json({
      success: true,
      message: "category created with the following data",
      category: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCategoryDetailsById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "categoryId is required",
      });
    }

    // find category by ID
    const category = await categoryModel
      .findById(categoryId)
      .populate("courses");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "no such category exists in the db",
      });
    }

    return res.status(200).json({
      success: true,
      message: "category details fetched",
      category: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
