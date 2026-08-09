import express from "express";
import {
  createCourt,
  getCourts,
  updateCourt,
  deleteCourt,
  bulkUpdatePricing,
} from "../controllers/courtController.js";

import { protect, admin } from "../middleware/auth.js";
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file &&
    file.mimetype &&
    /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)
  ) {
    return cb(null, true);
  }
  const error = new Error(
    "Only image files (JPEG, PNG, WebP, GIF) are allowed.",
  );
  error.statusCode = 400;
  return cb(error);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

// Public Routes
router.get("/", getCourts);

// Admin Routes
router.post("/", protect, admin, upload.single("image"), createCourt);
// Bulk pricing must be registered before "/:id" routes so it can't ever be
// swallowed by an :id param match.
router.patch("/pricing/bulk", protect, admin, bulkUpdatePricing);
router.put("/:id", protect, admin, upload.single("image"), updateCourt);
router.delete("/:id", protect, admin, deleteCourt);

export default router;
