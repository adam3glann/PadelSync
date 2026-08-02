import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { cancelBooking, createBooking, getBookings, getMyBookings, getSlots, getStats } from "../controllers/bookingController.js";

const router = express.Router();
router.get("/slots", protect, getSlots);
router.get("/mine", protect, getMyBookings);
router.get("/stats", protect, admin, getStats);
router.get("/", protect, admin, getBookings);
router.post("/", protect, createBooking);
router.put("/:id/cancel", protect, cancelBooking);
export default router;
