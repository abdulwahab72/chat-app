const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");

dotenv.config();

const protectMiddleware = async (req, resizeBy, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("error", error);
      res.statue(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

module.exports = { protectMiddleware };
