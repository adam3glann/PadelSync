import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    court: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
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

export default mongoose.model("Booking", bookingSchema);
