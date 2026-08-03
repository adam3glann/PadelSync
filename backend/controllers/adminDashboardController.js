import Booking from "../models/Booking.js";
import Court from "../models/Court.js";
import User from "../models/User.js";

// =========================
// Get Dashboard Stats
// =========================
export const getStats = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const [totalCourts, activeCourts, totalMembers, todayBookings, bookedBookings, cancelledBookings] =
            await Promise.all([
                Court.countDocuments(),
                Court.countDocuments({ isAvailable: true }),
                User.countDocuments({ role: "member" }),
                Booking.countDocuments({ date: today, status: "booked" }),
                Booking.find({ status: "booked" }),
                Booking.find({ status: "cancelled" })
            ]);

        let onlineDeposits = 0;
        let cashDue = 0;

        bookedBookings.forEach((b) => {
            onlineDeposits += b.payment?.depositAmount || 0;
            cashDue += b.payment?.cashAmount || 0;
        });

        let refundTotal = 0;
        let retainedCancelledDeposits = 0;

        cancelledBookings.forEach((b) => {
            refundTotal += b.cancellation?.refundAmount || 0;
            retainedCancelledDeposits += b.cancellation?.retainedAmount || 0;
        });

        res.status(200).json({
            totalCourts,
            activeCourts,
            todayBookings,
            totalBookings: bookedBookings.length,
            totalMembers,
            totalEarned: onlineDeposits + retainedCancelledDeposits,
            cashDue,
            expectedRevenue: onlineDeposits + cashDue,
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

        const filter = { status: "booked" };
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

        const deposit = booking.payment?.depositAmount || 0;
        let refundAmount = 0;

        if (booking.bookedAt) {
            const hoursSinceBooking = (Date.now() - new Date(booking.bookedAt).getTime()) / 3600000;

            if (hoursSinceBooking <= 2) {
                refundAmount = deposit;
            } else if (hoursSinceBooking <= 3) {
                refundAmount = deposit * 0.25;
            }
        }

        booking.status = "cancelled";
        booking.cancellation = {
            cancelledAt: new Date(),
            cancelledBy: "admin",
            refundAmount,
            retainedAmount: deposit - refundAmount
        };

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
            .sort({ "cancellation.cancelledAt": -1 });

        res.status(200).json(cancellations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
