import express from "express";
import {
  createReservation,
  getAvailability,
  getMyReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservationController.js";

import { protect } from "../middleware/auth.js";
import { isMember } from "../middleware/roleCheck.js";

const router = express.Router();

// Every reservation route requires a logged-in user
router.use(protect);

// Slot availability for a given date/court
router.get("/availability", isMember, getAvailability);

// Member reservation actions
router.post("/", isMember, createReservation);
router.get("/my", isMember, getMyReservations);
router.get("/:id", isMember, getReservationById);
router.delete("/:id", isMember, cancelReservation);

export default router;
