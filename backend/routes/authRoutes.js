import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect, admin } from "../middleware/auth.js";
import rateLimit from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", rateLimit({ windowMs: 60000, max: 10, message: "Too many registration attempts, please try again later." }), register);
router.post("/login", rateLimit({ windowMs: 60000, max: 20, message: "Too many login attempts, please try again later." }), login);

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Access granted.",
        user: req.user
    });
});
router.get("/admin", protect, admin, (req, res) => {
    res.json({
        message: "Welcome Admin!",
        user: req.user
    });
});

export default router;
