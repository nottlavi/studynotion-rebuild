//importing models here
const cartModel = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.body;

    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "no course id found which will be inserted",
      });
    }

    //finding the cart with this user id, this cart was created when the user was created for the first time in the db
    const userCart = await cartModel.findOne({ user: userId });

    if (userCart.courses.includes(courseId))
      return re
        .status(401)
        .json({ success: false, message: "course is already in the cart" });

    userCart.courses.push(courseId);

    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "course added to cart",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
