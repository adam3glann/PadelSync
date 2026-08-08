import express from "express";
import { protect, admin } from "../middleware/auth.js";
import rateLimit from "../middleware/rateLimiter.js";
import {
  cancelBooking,
  createBooking,
  getBookings,
  getMyBookings,
  getSlots,
  getStats,
} from "../controllers/bookingController.js";

const router = express.Router();
router.get("/slots", protect, getSlots);
router.get("/mine", protect, getMyBookings);
router.get("/stats", protect, admin, getStats);
router.get("/", protect, admin, getBookings);
router.post(
  "/",
  protect,
  rateLimit({
    windowMs: 60000,
    max: 30,
    message: "Too many booking requests, please slow down.",
  }),
  createBooking,
);
router.put("/:id/cancel", protect, cancelBooking);
export default router;
