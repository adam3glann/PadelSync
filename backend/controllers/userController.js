import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";

const publicUser = (user) => ({ id: user._id, _id: user._id, name: user.fullName, fullName: user.fullName, email: user.email, role: user.role, createdAt: user.createdAt });

export const getUsers = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1), limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
        const [total, users] = await Promise.all([User.countDocuments(), User.find().sort({ createdAt: 1 }).skip((page - 1) * limit).limit(limit)]);

        const counts = await Booking.aggregate([
            { $match: { user: { $in: users.map((u) => u._id) }, status: "confirmed" } },
            { $group: { _id: "$user", count: { $sum: 1 } } }
        ]);
        const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

        const data = users.map((user) => ({ ...publicUser(user), activeBookings: countMap.get(String(user._id)) || 0 }));
        res.json({ data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
    } catch (error) { next(error); }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { fullName, email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select("+password");
        if (!user) return res.status(404).json({ message: "User not found." });
        if (fullName) user.fullName = fullName.trim();
        if (email) user.email = email.trim().toLowerCase();
        if (newPassword) {
            if (!(await bcrypt.compare(currentPassword || "", user.password))) return res.status(400).json({ message: "Current password is incorrect." });
            if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters." });
            user.password = await bcrypt.hash(newPassword, 10);
        }
        await user.save();
        res.json({ message: "Profile updated successfully.", user: publicUser(user) });
    } catch (error) { next(error); }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found." });
        const { fullName, email, password, role } = req.body;
        if (role && !["member", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role." });
        if (role && user._id.equals(req.user._id)) return res.status(400).json({ message: "You cannot change your own role." });
        if (password && password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
        if (role && user.role === "admin" && role !== "admin") {
            const adminCount = await User.countDocuments({ role: "admin" });
            if (adminCount === 1) return res.status(400).json({ message: "At least one administrator is required." });
        }
        if (fullName) user.fullName = fullName.trim();
        if (email) user.email = email.trim().toLowerCase();
        if (role) user.role = role;
        if (password) user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.json({ message: "User updated successfully.", user: publicUser(user) });
    } catch (error) { next(error); }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found." });
        if (user._id.equals(req.user._id)) return res.status(400).json({ message: "You cannot delete your own account." });
        if (user.role === "admin") {
            const adminCount = await User.countDocuments({ role: "admin" });
            if (adminCount === 1) return res.status(400).json({ message: "At least one administrator is required." });
        }
        await Booking.deleteMany({ user: user._id });
        await user.deleteOne();
        res.json({ message: "User deleted successfully." });
    } catch (error) { next(error); }
};
