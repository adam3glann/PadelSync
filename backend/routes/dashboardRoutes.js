import express from "express";
import {
  getStats,
  getBookings,
  cancelBooking,
  getCancellations,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/roleCheck.js";

const router = express.Router();

// Every dashboard route is admin-only
router.use(protect, isAdmin);

router.get("/stats", getStats);
router.get("/bookings", getBookings);
router.delete("/bookings/:id", cancelBooking);
router.get("/cancellations", getCancellations);

export default router;
