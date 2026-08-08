import Court from "../models/Court.js";
import Booking from "../models/Booking.js";
import cloudinary from "../config/cloudinary.js";

// Images now live on Cloudinary (not local disk), so every device/server
// instance resolves the same URL instead of only whoever handled the upload.
const removeImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Ignore failures (e.g. asset already removed).
  }
};

// Streams the in-memory file buffer (from multer's memoryStorage) to
// Cloudinary and resolves with { url, publicId }.
const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "padelsync/courts",
        public_id: `court-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(file.buffer);
  });

// Create Court (Admin)
export const createCourt = async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const pricePerHour = Number(req.body.pricePerHour || req.body.price || 300);

    if (!name) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }
    if (!Number.isFinite(pricePerHour) || pricePerHour < 0) {
      return res.status(400).json({ message: "Invalid price." });
    }

    const uploaded = req.file ? await uploadImage(req.file) : null;

    const court = await Court.create({
      name,
      location: req.body.location,
      pricePerHour,
      description: req.body.description,
      image: uploaded ? uploaded.url : "",
      imagePublicId: uploaded ? uploaded.publicId : "",
    });

    res.status(201).json({ message: "Court created successfully.", court });
  } catch (error) {
    next(error);
  }
};

// Get All Courts
export const getCourts = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const [total, data] = await Promise.all([
      Court.countDocuments(),
      Court.find()
        .skip((page - 1) * limit)
        .limit(limit),
    ]);
    res.status(200).json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update Court (Admin)
export const updateCourt = async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: "Court not found." });
    }

    const updates = {};
    const oldImagePublicId = court.imagePublicId;
    if (req.body.name !== undefined)
      updates.name = String(req.body.name).trim();
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.description !== undefined)
      updates.description = req.body.description;
    if (req.body.status !== undefined) {
      if (!["active", "maintenance"].includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid status." });
      }
      updates.status = req.body.status;
    }
    if (req.body.pricePerHour !== undefined) {
      const pricePerHour = Number(req.body.pricePerHour);
      if (!Number.isFinite(pricePerHour) || pricePerHour < 0) {
        return res.status(400).json({ message: "Invalid price." });
      }
      updates.pricePerHour = pricePerHour;
    }

    if (req.file) {
      const uploaded = await uploadImage(req.file);
      updates.image = uploaded.url;
      updates.imagePublicId = uploaded.publicId;
    }

    Object.assign(court, updates);
    await court.save();

    if (req.file && oldImagePublicId) {
      removeImage(oldImagePublicId);
    }

    res.status(200).json({ message: "Court updated successfully.", court });
  } catch (error) {
    next(error);
  }
};

// Delete Court (Admin)
export const deleteCourt = async (req, res, next) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) {
      return res.status(404).json({ message: "Court not found." });
    }
    await Booking.deleteMany({ court: court._id });
    removeImage(court.imagePublicId);
    res.status(200).json({ message: "Court deleted successfully." });
  } catch (error) {
    next(error);
  }
};
