import mongoose from "mongoose";
<<<<<<< HEAD
import { TIME_BLOCKS } from "../utils/constants.js";
=======
>>>>>>> 906d52d (Implement authentication and authorization)

const bookingSchema = new mongoose.Schema({
    court: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
<<<<<<< HEAD
    timeBlock: { type: String, required: true, enum: TIME_BLOCKS },
    equipment: { type: String, default: "None", maxlength: 200 },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
    totalAmount: { type: Number, required: true, min: 0 },
    depositAmount: { type: Number, required: true, min: 0 },
    cashAmount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["demo-paid", "refunded", "not-refunded"], default: "demo-paid" },
    refundAmount: { type: Number, default: 0, min: 0 },
    cancelledAt: Date
}, { timestamps: true });

// Prevent double-booking: only one confirmed booking may exist per court/date/block.
bookingSchema.index({ court: 1, date: 1, timeBlock: 1 }, { unique: true });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ court: 1, date: 1, status: 1 });

=======
    timeBlock: { type: String, required: true },
    equipment: { type: String, default: "None" },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
    totalAmount: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    cashAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["demo-paid", "refunded", "not-refunded"], default: "demo-paid" },
    refundAmount: { type: Number, default: 0 },
    cancelledAt: Date
}, { timestamps: true });

>>>>>>> 906d52d (Implement authentication and authorization)
export default mongoose.model("Booking", bookingSchema);
