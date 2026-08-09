import Court from "../models/Court.js";
import Booking from "../models/Booking.js";
import cloudinary from "../config/cloudinary.js";

const removeImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Ignore failures (e.g. asset already removed).
  }
};

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

// A price/discount pair is valid when both are finite numbers in range.
// Returns an error message string, or null when the pair is fine.
const validatePricing = (pricePerHour, discountPercent) => {
  if (pricePerHour !== undefined) {
    if (!Number.isFinite(pricePerHour) || pricePerHour < 0) {
      return "Invalid price.";
    }
  }
  if (discountPercent !== undefined) {
    if (
      !Number.isFinite(discountPercent) ||
      discountPercent < 0 ||
      discountPercent > 100
    ) {
      return "Discount must be a number between 0 and 100.";
    }
  }
  return null;
};

// Create Court (Admin)
export const createCourt = async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const pricePerHour = Number(req.body.pricePerHour || req.body.price || 300);
    const discountPercent = Number(req.body.discountPercent || 0);

    if (!name) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }
    const pricingError = validatePricing(pricePerHour, discountPercent);
    if (pricingError) return res.status(400).json({ message: pricingError });

    const uploaded = req.file ? await uploadImage(req.file) : null;

    const court = await Court.create({
      name,
      location: req.body.location,
      pricePerHour,
      discountPercent,
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
      const pricingError = validatePricing(pricePerHour, undefined);
      if (pricingError) return res.status(400).json({ message: pricingError });
      updates.pricePerHour = pricePerHour;
    }
    if (req.body.discountPercent !== undefined) {
      const discountPercent = Number(req.body.discountPercent);
      const pricingError = validatePricing(undefined, discountPercent);
      if (pricingError) return res.status(400).json({ message: pricingError });
      updates.discountPercent = discountPercent;
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

// Bulk Pricing — set a price and/or discount on every court at once (Admin).
// Either field can be omitted; at least one must be provided.
export const bulkUpdatePricing = async (req, res, next) => {
  try {
    const hasPrice = req.body.pricePerHour !== undefined;
    const hasDiscount = req.body.discountPercent !== undefined;
    if (!hasPrice && !hasDiscount) {
      return res.status(400).json({
        message: "Provide a price and/or a discount percentage to apply.",
      });
    }

    const pricePerHour = hasPrice ? Number(req.body.pricePerHour) : undefined;
    const discountPercent = hasDiscount
      ? Number(req.body.discountPercent)
      : undefined;
    const pricingError = validatePricing(pricePerHour, discountPercent);
    if (pricingError) return res.status(400).json({ message: pricingError });

    const updates = {};
    if (hasPrice) updates.pricePerHour = pricePerHour;
    if (hasDiscount) updates.discountPercent = discountPercent;

    const result = await Court.updateMany({}, { $set: updates });

    res.status(200).json({
      message: `Pricing applied to ${result.modifiedCount} court(s).`,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      pricePerHour,
      discountPercent,
    });
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
