const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");

exports.addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.user;

    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "no course id found which will be inserted",
      });
    }

    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "no user id found" });

    //finding the cart with this user id, this cart was created when the user was created for the first time in the db
    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "no such user cart found",
      });
    }

    if (userCart.courses.includes(courseId))
      return res
        .status(401)
        .json({ success: false, message: "course is already in the cart" });

    userCart.courses.push(courseId);

    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "course added to cart",
      cart: userCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.user;

    const userCart = await cartModel.findOne({ user: userId }).populate({
      path: "courses",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      message: "cart details fetched successfilly",
      cart: userCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId } = req.user;
  const { courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(404).json({
      success: false,
      message: "token or course id missing",
    });
  }

  const userCart = await cartModel.findOne({ user: userId });

  if (!userCart) {
    return res.status(404).json({
      success: false,
      message: "couldn't find a user cart with this token",
    });
  }

  if (!userCart.courses.includes(courseId)) {
    return res.status(400).json({
      success: false,
      message: "the course doesnt exist in your cart",
    });
  }

  userCart.courses = userCart.courses.filter(
    (id) => id.toString() !== courseId,
  );

  await userCart.save();

  return res.status(200).json({
    success: true,
    message: "course removed from cart",
    cart: userCart,
  });
};
