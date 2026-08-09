import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: { type: String, default: "Heliopolis, Cairo, Egypt", trim: true },

    pricePerHour: {
      type: Number,
      default: 300,
      min: 0,
      max: 100000,
    },

    // Percentage knocked off pricePerHour when charging for a booking
    // (0 = no discount, 100 = free). Kept separate from pricePerHour so the
    // "real" price is never lost when a promo ends.
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    // Cloudinary's public_id for the uploaded image, kept alongside the URL so
    // the old asset can be deleted from Cloudinary when it's replaced or the
    // court is removed.
    imagePublicId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "maintenance"],
      default: "active",
    },
  },
  {
    timestamps: true,
    // Include virtuals (effectivePrice) whenever a Court is sent as JSON.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

courtSchema.virtual("effectivePrice").get(function () {
  const rate = 1 - (this.discountPercent || 0) / 100;
  return Math.round(this.pricePerHour * rate * 100) / 100;
});

export default mongoose.model("Court", courtSchema);
