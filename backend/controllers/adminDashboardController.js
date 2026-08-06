import Booking from "../models/Booking.js";
import Court from "../models/Court.js";
import User from "../models/User.js";

// =========================
// Get Dashboard Stats
// =========================
export const getStats = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const [totalCourts, activeCourts, totalMembers, todayBookings, confirmedBookings, cancelledBookings] =
            await Promise.all([
                Court.countDocuments(),
                Court.countDocuments({ status: "active" }),
                User.countDocuments({ role: "member" }),
                Booking.countDocuments({ date: today, status: "confirmed" }),
                Booking.find({ status: "confirmed" }),
                Booking.find({ status: "cancelled" })
            ]);

        let onlineDeposits = 0;
        let cashDue = 0;

        confirmedBookings.forEach((b) => {
            onlineDeposits += b.depositAmount || 0;
            cashDue += b.cashAmount || 0;
        });

        let refundTotal = 0;

        cancelledBookings.forEach((b) => {
            refundTotal += b.refundAmount || 0;
        });

        res.status(200).json({
            totalCourts,
            activeCourts,
            todayBookings,
            totalBookings: confirmedBookings.length,
            totalMembers,
            totalEarned: onlineDeposits - refundTotal,
            cashDue,
            expectedRevenue: onlineDeposits + cashDue - refundTotal,
            cancelledCount: cancelledBookings.length,
            refundTotal
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// Get All Bookings (optional date filter, paginated)
// =========================
export const getAllBookings = async (req, res) => {
    try {
        const { date } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = { status: "confirmed" };
        if (date) filter.date = date;

        const [bookings, total] = await Promise.all([
            Booking.find(filter)
                .populate("court", "name description")
                .populate("user", "fullName email")
                .sort({ date: 1, timeBlock: 1 })
                .skip(skip)
                .limit(limit),
            Booking.countDocuments(filter)
        ]);

        res.status(200).json({
            data: bookings,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// Cancel Any Booking (Admin override)
// =========================
export const cancelBookingByAdmin = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "This booking is already cancelled."
            });
        }

        const deposit = booking.depositAmount || 0;
        let refundAmount = 0;

        if (booking.createdAt) {
            const hoursSinceBooking = (Date.now() - new Date(booking.createdAt).getTime()) / 3600000;

            if (hoursSinceBooking <= 2) {
                refundAmount = deposit;
            } else if (hoursSinceBooking <= 3) {
                refundAmount = deposit * 0.25;
            }
        }

        booking.status = "cancelled";
        booking.refundAmount = refundAmount;
        booking.paymentStatus = refundAmount > 0 ? "refunded" : "not-refunded";
        booking.cancelledAt = new Date();

        await booking.save();

        res.status(200).json({
            message: "Booking cancelled by admin.",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// Get Cancellation History
// =========================
export const getCancellations = async (req, res) => {
    try {
        const cancellations = await Booking.find({ status: "cancelled" })
            .populate("court", "name")
            .populate("user", "fullName email")
            .sort({ cancelledAt: -1 });

        res.status(200).json(cancellations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};