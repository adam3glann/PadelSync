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
  },
);

export default mongoose.model("Court", courtSchema);
