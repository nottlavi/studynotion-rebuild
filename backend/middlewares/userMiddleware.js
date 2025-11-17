const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "no token found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }

    console.log(decoded);

    req.user = decoded;
    next();
  });
};
