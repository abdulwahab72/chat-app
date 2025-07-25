const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { userName, phoneNumber, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const existingUserByNumber = await User.findOne({ phoneNumber });
    if (existingUser || existingUserByNumber) {
      return res.status(400).json({
        success: false,
        message: existingUser
          ? "Email already exists"
          : "Phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      token,
      data: {
        id: newUser._id,
        userName: newUser.userName,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: "Login successfull",
      user: {
        id: user._id,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
      token,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};
module.exports = { signup, login };
