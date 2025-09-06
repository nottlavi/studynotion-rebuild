const { User } = require("../models/User");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "couldnt find a user with this email",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const updatedDetails = await User.finOneandUpdate({
        email: email,
        {token: token,
            resetPasswordExpires: Date.now() + 3600000;
        },
        {new: true}
    })
    console.log("updated details: ", updatedDetails)
  } catch (err) {}
};

// exports.resetPassword = async (req, res) => {
//   try {
//     const { password, confirmPassword, token } = req.body;
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "password and confirm passwords do not match",
//       });
//     }
//     const userDetails = User.findOne({token: token})
//     if(!userDetails) {
//         return res.status(400).json({
//             success: false,
//             message: "couldnt find a user for this token"
//         })
//     }
//   } catch (err) {}
// };
