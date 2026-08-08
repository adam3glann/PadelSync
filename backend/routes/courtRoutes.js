import express from "express";
import {
  createCourt,
  getCourts,
  updateCourt,
  deleteCourt,
} from "../controllers/courtController.js";

import { protect, admin } from "../middleware/auth.js";
import multer from "multer";

// Uploaded files are held in memory only, then streamed straight to
// Cloudinary in the controller — nothing ever touches local disk. That's
// what makes an image uploaded on one device/server instance visible from
// every other one; local disk storage only exists wherever the request
// happened to land, which is why one teammate's upload wasn't visible to
// anyone else.
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
router.put("/:id", protect, admin, upload.single("image"), updateCourt);
router.delete("/:id", protect, admin, deleteCourt);

export default router;
