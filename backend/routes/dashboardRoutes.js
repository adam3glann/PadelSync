import express from "express";
import {
  getStats,
  getAllBookings,
  cancelBookingByAdmin,
  getCancellations,
} from "../controllers/adminDashboardController.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/roleCheck.js";

const router = express.Router();

// Every dashboard route is admin-only
router.use(protect, isAdmin);

router.get("/stats", getStats);
router.get("/bookings", getAllBookings);
router.delete("/bookings/:id", cancelBookingByAdmin);
router.get("/cancellations", getCancellations);

export default router;
