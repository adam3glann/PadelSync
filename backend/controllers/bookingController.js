import Booking from "../models/Booking.js";
import Court from "../models/Court.js";
<<<<<<< HEAD
import User from "../models/User.js";
import { TIME_BLOCKS, isValidDate, localDateString } from "../utils/constants.js";

const BLOCK_HOURS = 1.5;

// Parse the start time ("HH:MM - HH:MM") of a time block.
const blockStartMinutes = (timeBlock) => {
    const match = /^(\d{2}):(\d{2})/.exec(timeBlock || "");
    if (!match) return null;
    return Number(match[1]) * 60 + Number(match[2]);
};
=======

const TIME_BLOCKS = ["09:00 - 10:30", "10:30 - 12:00", "12:00 - 13:30", "16:30 - 18:00", "18:00 - 19:30", "19:30 - 21:00"];
const validDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
>>>>>>> 906d52d (Implement authentication and authorization)

export const getSlots = async (req, res, next) => {
    try {
        const { date } = req.query;
<<<<<<< HEAD
        if (!isValidDate(date)) return res.status(400).json({ message: "A valid booking date is required." });
=======
        if (!validDate(date)) return res.status(400).json({ message: "A valid booking date is required." });
>>>>>>> 906d52d (Implement authentication and authorization)
        const [courts, bookings] = await Promise.all([
            Court.find({}),
            Booking.find({ date, status: "confirmed" }).populate("user", "fullName email")
        ]);
        const bookingMap = new Map(bookings.map((booking) => [`${booking.court}|${booking.timeBlock}`, booking]));
        const slots = courts.flatMap((court) => TIME_BLOCKS.map((timeBlock) => {
            const booking = bookingMap.get(`${court._id}|${timeBlock}`);
            return {
                _id: booking ? booking._id : `${court._id}|${date}|${timeBlock}`,
<<<<<<< HEAD
                courtId: { _id: court._id, name: court.name, description: court.description, status: court.status, image: court.image, pricePerHour: court.pricePerHour },
                date, timeBlock, isBooked: Boolean(booking),
                bookedBy: booking && booking.user ? { _id: booking.user._id } : null,
=======
                courtId: { _id: court._id, name: court.name, description: court.description, status: court.status, image: court.image },
                date, timeBlock, isBooked: Boolean(booking),
                bookedBy: booking ? { _id: booking.user._id, name: booking.user.fullName, email: booking.user.email } : null,
>>>>>>> 906d52d (Implement authentication and authorization)
                equipment: booking?.equipment || "None", payment: booking ? { totalAmount: booking.totalAmount, depositAmount: booking.depositAmount, cashAmount: booking.cashAmount } : null
            };
        }));
        res.json(slots);
    } catch (error) { next(error); }
};

export const createBooking = async (req, res, next) => {
    try {
        const { courtId, date, timeBlock, equipment } = req.body;
<<<<<<< HEAD
        if (!courtId || !isValidDate(date, { maxDays: 30 }) || !TIME_BLOCKS.includes(timeBlock)) {
            return res.status(400).json({ message: "Court, a valid upcoming date, and a time block are required." });
        }
        const court = await Court.findById(courtId);
        if (!court || court.status !== "active") return res.status(400).json({ message: "This court is not available." });

        const totalAmount = Math.round(court.pricePerHour * BLOCK_HOURS * 100) / 100;
        try {
            const booking = await Booking.create({
                court: courtId,
                user: req.user._id,
                date,
                timeBlock,
                equipment: String(equipment || "None").slice(0, 200),
                totalAmount,
                depositAmount: Math.round(totalAmount / 2 * 100) / 100,
                cashAmount: Math.round(totalAmount / 2 * 100) / 100
            });
            res.status(201).json({ message: "Demo payment successful. Your booking is confirmed.", booking });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({ message: "This time slot was just booked by someone else." });
            }
            throw err;
        }
=======
        if (!courtId || !validDate(date) || !TIME_BLOCKS.includes(timeBlock)) return res.status(400).json({ message: "Court, date, and time block are required." });
        const court = await Court.findById(courtId);
        if (!court || court.status !== "active") return res.status(400).json({ message: "This court is not available." });
        const exists = await Booking.findOne({ court: courtId, date, timeBlock, status: "confirmed" });
        if (exists) return res.status(409).json({ message: "This time slot is already booked." });
        const totalAmount = court.pricePerHour;
        const booking = await Booking.create({ court: courtId, user: req.user._id, date, timeBlock, equipment, totalAmount, depositAmount: totalAmount / 2, cashAmount: totalAmount / 2 });
        res.status(201).json({ message: "Demo payment successful. Your booking is confirmed.", booking });
>>>>>>> 906d52d (Implement authentication and authorization)
    } catch (error) { next(error); }
};

export const getMyBookings = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1), limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
<<<<<<< HEAD
        const status = req.query.status === "cancelled" ? "cancelled" : "confirmed";
        const query = { user: req.user._id, status };
=======
        const query = { user: req.user._id, status: "confirmed" };
>>>>>>> 906d52d (Implement authentication and authorization)
        const [total, data] = await Promise.all([Booking.countDocuments(query), Booking.find(query).populate("court", "name description").sort({ date: 1, timeBlock: 1 }).skip((page - 1) * limit).limit(limit)]);
        res.json({ data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
    } catch (error) { next(error); }
};

export const getBookings = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1), limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
        const query = {};
<<<<<<< HEAD
        if (req.query.date && isValidDate(req.query.date)) query.date = req.query.date;
=======
        if (req.query.date) query.date = req.query.date;
>>>>>>> 906d52d (Implement authentication and authorization)
        if (req.query.status && ["confirmed", "cancelled"].includes(req.query.status)) query.status = req.query.status;
        const [total, data] = await Promise.all([Booking.countDocuments(query), Booking.find(query).populate("court", "name").populate("user", "fullName email").sort({ date: 1, timeBlock: 1 }).skip((page - 1) * limit).limit(limit)]);
        res.json({ data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
    } catch (error) { next(error); }
};

export const cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found." });
        if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") return res.status(403).json({ message: "You can only cancel your own booking." });
        if (booking.status === "cancelled") return res.status(400).json({ message: "This booking is already cancelled." });
<<<<<<< HEAD

        // Refund is based on the time remaining until the scheduled start,
        // not on how long ago the booking was created.
        const startMinutes = blockStartMinutes(booking.timeBlock);
        let refundAmount = 0;
        if (startMinutes !== null) {
            const [y, m, d] = booking.date.split("-").map(Number);
            const start = new Date(y, m - 1, d, Math.floor(startMinutes / 60), startMinutes % 60, 0, 0);
            const hoursUntilPlay = (start.getTime() - Date.now()) / 3600000;
            if (hoursUntilPlay > 2) refundAmount = booking.depositAmount;
            else if (hoursUntilPlay > 0) refundAmount = Math.round(booking.depositAmount * 0.25 * 100) / 100;
        }

        booking.status = "cancelled";
        booking.refundAmount = refundAmount;
        booking.paymentStatus = refundAmount ? "refunded" : "not-refunded";
        booking.cancelledAt = new Date();
        await booking.save();

        res.json({ message: refundAmount ? `Booking cancelled. Refund: EGP ${refundAmount}.` : "Booking cancelled. The deposit is not refundable within 2 hours of the match.", refundAmount });
=======
        const hours = (Date.now() - booking.createdAt.getTime()) / 3600000;
        const refundAmount = hours <= 2 ? booking.depositAmount : hours <= 3 ? booking.depositAmount * 0.25 : 0;
        booking.status = "cancelled"; booking.refundAmount = refundAmount; booking.paymentStatus = refundAmount ? "refunded" : "not-refunded"; booking.cancelledAt = new Date();
        await booking.save();
        res.json({ message: refundAmount ? `Booking cancelled. Refund: EGP ${refundAmount}.` : "Booking cancelled. The deposit is not refundable after 3 hours.", refundAmount });
>>>>>>> 906d52d (Implement authentication and authorization)
    } catch (error) { next(error); }
};

export const getStats = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const [courts, members, bookings, cancellations] = await Promise.all([Court.find(), User.countDocuments({ role: "member" }), Booking.find({ status: "confirmed" }), Booking.find({ status: "cancelled" })]);
        const today = localDateString();
        const deposits = bookings.reduce((sum, booking) => sum + (booking.depositAmount || 0), 0);
        const cashDue = bookings.reduce((sum, booking) => sum + (booking.cashAmount || 0), 0);
        const refunds = cancellations.reduce((sum, booking) => sum + (booking.refundAmount || 0), 0);
        res.json({
            totalCourts: courts.length,
            activeCourts: courts.filter((court) => court.status === "active").length,
            todayBookings: bookings.filter((booking) => booking.date === today).length,
            totalMembers: members,
            totalEarned: Math.round((deposits - refunds) * 100) / 100,
            cashDue,
            cancelledCount: cancellations.length,
            expectedRevenue: Math.round((deposits + cashDue - refunds) * 100) / 100,
            refundTotal: refunds
        });
=======
        const [courts, members, bookings, cancellations] = await Promise.all([Court.find(), (await import("../models/User.js")).default.countDocuments({ role: "member" }), Booking.find({ status: "confirmed" }), Booking.find({ status: "cancelled" })]);
        const today = new Date().toISOString().slice(0, 10);
        const deposits = bookings.reduce((sum, booking) => sum + booking.depositAmount, 0);
        const cashDue = bookings.reduce((sum, booking) => sum + booking.cashAmount, 0);
        const refunds = cancellations.reduce((sum, booking) => sum + booking.refundAmount, 0);
        res.json({ totalCourts: courts.length, activeCourts: courts.filter((court) => court.status === "active").length, todayBookings: bookings.filter((booking) => booking.date === today).length, totalMembers: members, totalEarned: deposits - refunds, cashDue, cancelledCount: cancellations.length, expectedRevenue: deposits + cashDue - refunds, refundTotal: refunds });
>>>>>>> 906d52d (Implement authentication and authorization)
    } catch (error) { next(error); }
};
