import express from "express";
import { register, login } from "../controllers/authController.js";
import rateLimit from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/register",
  rateLimit({
    windowMs: 60000,
    max: 10,
    message: "Too many registration attempts, please try again later.",
  }),
  register,
);
router.post(
  "/login",
  rateLimit({
    windowMs: 60000,
    max: 20,
    message: "Too many login attempts, please try again later.",
  }),
  login,
);

export default router;
