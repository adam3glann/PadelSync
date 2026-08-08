import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const publicUser = (user) => ({
  id: user._id,
  _id: user._id,
  name: user.fullName,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// =========================
// Register
// =========================
export const register = async (req, res) => {
  try {
    const fullName = String(req.body.fullName || "").trim();
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = req.body.password || "";

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (fullName.length < 2) {
      return res
        .status(400)
        .json({ message: "Full name must be at least 2 characters." });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = signToken(user);

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

// =========================
// Login
// =========================
export const login = async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = req.body.password || "";

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user);

    res.status(200).json({
      message: "Login successful.",
      token,
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};
