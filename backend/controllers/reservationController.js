import Booking from "../models/Booking.js";
import Court from "../models/Court.js";

// Cancellation refund policy (matches the deposit rules shown on the booking page)
const REFUND_FULL_WINDOW_HOURS = 2;
const REFUND_PARTIAL_WINDOW_HOURS = 3;
const REFUND_PARTIAL_RATE = 0.25;

function calculateRefund(deposit, bookedAt) {
    if (!bookedAt || !deposit) return 0;

    const hoursSinceBooking = (Date.now() - new Date(bookedAt).getTime()) / 3600000;

    if (hoursSinceBooking <= REFUND_FULL_WINDOW_HOURS) {
        return deposit;
    }

    if (hoursSinceBooking <= REFUND_PARTIAL_WINDOW_HOURS) {
        return deposit * REFUND_PARTIAL_RATE;
    }

    return 0;
}

// =========================
// Create Reservation (book a slot + pay the deposit)
// =========================
export const createReservation = async (req, res) => {
    try {
        const { courtId, date, timeBlock, equipment } = req.body;

        if (!courtId || !date || !timeBlock) {
            return res.status(400).json({
                message: "Please provide courtId, date and timeBlock."
            });
        }

        const court = await Court.findById(courtId);

        if (!court) {
            return res.status(404).json({
                message: "Court not found."
            });
        }

        if (!court.isAvailable) {
            return res.status(400).json({
                message: "This court is currently out of service."
            });
        }

        // Prevent double-booking the same slot
        const existing = await Booking.findOne({
            court: courtId,
            date,
            timeBlock,
            status: "booked"
        });

        if (existing) {
            return res.status(400).json({
                message: "This slot is already booked."
            });
        }

        const totalAmount = court.pricePerHour;
        const depositAmount = totalAmount / 2;
        const cashAmount = totalAmount - depositAmount;

        const booking = await Booking.create({
            court: courtId,
            user: req.user._id,
            date,
            timeBlock,
            equipment: equipment || "None",
            status: "booked",
            bookedAt: new Date(),
            payment: {
                totalAmount,
                depositAmount,
                cashAmount,
                paidAt: new Date()
            }
        });

        res.status(201).json({
            message: "Deposit paid and court booked successfully!",
            booking
        });

    } catch (error) {
        // Race condition fallback: the unique index also blocks double-booking
        if (error.code === 11000) {
            return res.status(400).json({
                message: "This slot is already booked."
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// Get Availability (booked slots for a date, optionally filtered by court)
// =========================
export const getAvailability = async (req, res) => {
    try {
        const { date, courtId } = req.query;

        if (!date) {
            return res.status(400).json({
                message: "Please provide a date."
            });
        }

        const filter = { date, status: "booked" };
        if (courtId) filter.court = courtId;

        const bookings = await Booking.find(filter)
            .populate("court", "name description pricePerHour image isAvailable")
            .populate("user", "fullName email");

        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// Get My Reservations (paginated)
// =========================
export const getMyReservations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = { user: req.user._id };

        const [bookings, total] = await Promise.all([
            Booking.find(filter)
                .populate("court", "name description pricePerHour image")
                .sort({ date: -1, timeBlock: -1 })
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
// Get Reservation By ID
// =========================
export const getReservationById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("court", "name description pricePerHour image")
            .populate("user", "fullName email");

        if (!booking) {
            return res.status(404).json({
                message: "Reservation not found."
            });
        }

        const isOwner = booking.user._id.toString() === req.user._id.toString();

        if (!isOwner && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. This is not your reservation."
            });
        }

        res.status(200).json(booking);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// =========================
// Cancel Reservation (member cancels own; admin can cancel any)
// =========================
export const cancelReservation = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Reservation not found."
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "This reservation is already cancelled."
            });
        }

        const isOwner = booking.user.toString() === req.user._id.toString();

        if (!isOwner && req.user.role !== "admin") {
            return res.status(403).json({
                message: "You can only cancel your own reservations."
            });
        }

        const deposit = booking.payment?.depositAmount || 0;
        const refundAmount = calculateRefund(deposit, booking.bookedAt);

        booking.status = "cancelled";
        booking.cancellation = {
            cancelledAt: new Date(),
            cancelledBy: req.user.role === "admin" ? "admin" : "member",
            refundAmount,
            retainedAmount: deposit - refundAmount
        };

        await booking.save();

        res.status(200).json({
            message: refundAmount > 0
                ? `Booking cancelled. Refund: EGP ${refundAmount}`
                : "Booking cancelled. The deposit is not refundable after 3 hours.",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
