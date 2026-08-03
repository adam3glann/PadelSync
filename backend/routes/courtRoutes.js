import express from "express";
import {
    createCourt,
    getCourts,
    getCourtById,
    updateCourt,
    deleteCourt
} from "../controllers/courtController.js";

import { protect, admin } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const UPLOADS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "uploads");

// Store uploads with their original extension so served files keep a sane
// content type. Only image files up to 5 MB are accepted.
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname || "").toLowerCase();
        cb(null, `court-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file && file.mimetype && /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
        return cb(null, true);
    }
    const error = new Error("Only image files (JPEG, PNG, WebP, GIF) are allowed.");
    error.statusCode = 400;
    return cb(error);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const router = express.Router();

// Public Routes
router.get("/", getCourts);
router.get("/:id", getCourtById);

// Admin Routes
router.post("/", protect, admin, upload.single("image"), createCourt);
router.put("/:id", protect, admin, upload.single("image"), updateCourt);
router.delete("/:id", protect, admin, deleteCourt);

export default router;
