import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    // console.log("Req.body", req.body);
    const { name, email, password } = req.body;

    // Check if valid inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Check if email exists in DB
    const checkIfExist = await User.findOne({ email });
    if (checkIfExist) {
      return res
        .status(400)
        .json({ message: "User already exist with the mail, try login" });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    //Create the user in the DB
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role: "member",
    });

    //Define the JWT token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRETA,
      { expiresIn: "30m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRETR,
      { expiresIn: "30d" },
    );

    // Storing the cookie in http-cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //Store the token in redis here rather using http-cookie

    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are requied" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, try signup" });
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //Define the JWT token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRETA,
      { expiresIn: "30m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRETR,
      { expiresIn: "30d" },
    );

    //Storing the token in http-cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //Store the token in redis here rather using http-cookie

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error in Login", err);
    res.status(500).json({ message: "Server error while login" });
  }
};

export { signup, login };
