import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect, admin } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

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