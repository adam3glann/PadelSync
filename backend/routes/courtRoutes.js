import express from "express";
import {
    createCourt,
    getCourts,
    getCourtById,
    updateCourt,
    deleteCourt
} from "../controllers/courtController.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.get("/", getCourts);
router.get("/:id", getCourtById);

// Admin Routes
router.post("/", protect, admin, createCourt);
router.put("/:id", protect, admin, updateCourt);
router.delete("/:id", protect, admin, deleteCourt);

export default router;