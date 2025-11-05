const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Signup request received:", req.body);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists', success: false });
    }

    const newUser = new UserModel({ username, email, password });

    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    const jwtToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log("Signup successful, token:", jwtToken);

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      token: jwtToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    console.log("Error during signup:", err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Authentication Failed", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Authentication Failed", success: false });
    }
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({
        message: "Login successfully",
        success: true,
        token: jwtToken,
        user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (err) {
    console.log("Error during signup:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
module.exports = { signup, login };


