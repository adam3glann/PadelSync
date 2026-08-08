import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (!header || scheme.toLowerCase() !== "bearer" || !token) {
      return res
        .status(401)
        .json({ message: "Not authorized. No token provided." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured. Set it in the environment.");
      return res.status(500).json({ message: "Server configuration error." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    try {
      user = await User.findById(decoded.id).select("-password");
    } catch (dbError) {
      console.error("Database error while authenticating:", dbError.message);
      return res
        .status(503)
        .json({ message: "Service temporarily unavailable." });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized. Invalid token." });
  }
};

export const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
