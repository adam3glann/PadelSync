import mongoose from "mongoose";
import { TIME_BLOCKS } from "../utils/constants.js";

const bookingSchema = new mongoose.Schema(
  {
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    timeBlock: { type: String, required: true, enum: TIME_BLOCKS },
    equipment: { type: String, default: "None", maxlength: 200 },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    totalAmount: { type: Number, required: true, min: 0 },
    depositAmount: { type: Number, required: true, min: 0 },
    cashAmount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["demo-paid", "refunded", "not-refunded"],
      default: "demo-paid",
    },
    refundAmount: { type: Number, default: 0, min: 0 },
    cancelledAt: Date,
  },
  { timestamps: true },
);

bookingSchema.index(
  { court: 1, date: 1, timeBlock: 1 },
  { unique: true, partialFilterExpression: { status: "confirmed" } },
);
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ court: 1, date: 1, status: 1 });

export default mongoose.model("Booking", bookingSchema);
