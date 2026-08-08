import express from "express";
import {
  createBooking,
  getSlots,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/auth.js";
import { isMember } from "../middleware/roleCheck.js";

const router = express.Router();

// Every reservation route requires a logged-in user
router.use(protect);

// Slot availability for a given date/court
router.get("/availability", isMember, getSlots);

// Member reservation actions
router.post("/", isMember, createBooking);
router.get("/my", isMember, getMyBookings);
router.get("/:id", isMember, getBookingById);
router.delete("/:id", isMember, cancelBooking);

export default router;
