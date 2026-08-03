import Court from "../models/Court.js";
import Booking from "../models/Booking.js";
import { fileURLToPath } from "url";
import path from "path";
import { promises as fs } from "fs";

const UPLOADS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "uploads");

const removeImage = async (filename) => {
    if (!filename) return;
    try {
        await fs.unlink(path.join(UPLOADS_DIR, filename));
    } catch {
        // Ignore missing files.
    }
};

// Create Court (Admin)
export const createCourt = async (req, res, next) => {
    try {
        const name = String(req.body.name || "").trim();
        const pricePerHour = Number(req.body.pricePerHour || req.body.price || 300);

        if (!name) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }
        if (!Number.isFinite(pricePerHour) || pricePerHour < 0) {
            return res.status(400).json({ message: "Invalid price." });
        }

        const court = await Court.create({
            name,
            location: req.body.location,
            pricePerHour,
            description: req.body.description,
            image: req.file ? req.file.filename : ""
        });

        res.status(201).json({ message: "Court created successfully.", court });
    } catch (error) { next(error); }
};

// Get All Courts
export const getCourts = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
        const [total, data] = await Promise.all([Court.countDocuments(), Court.find().skip((page - 1) * limit).limit(limit)]);
        res.status(200).json({ data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
    } catch (error) { next(error); }
};

// Get Court By ID
export const getCourtById = async (req, res, next) => {
    try {
        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: "Court not found." });
        }
        res.status(200).json(court);
    } catch (error) { next(error); }
};

// Update Court (Admin)
export const updateCourt = async (req, res, next) => {
    try {
        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: "Court not found." });
        }

        const updates = {};
        const oldImage = court.image;
        if (req.body.name !== undefined) updates.name = String(req.body.name).trim();
        if (req.body.location !== undefined) updates.location = req.body.location;
        if (req.body.description !== undefined) updates.description = req.body.description;
        if (req.body.status !== undefined) {
            if (!["active", "maintenance"].includes(req.body.status)) {
                return res.status(400).json({ message: "Invalid status." });
            }
            updates.status = req.body.status;
        }
        if (req.body.pricePerHour !== undefined) {
            const pricePerHour = Number(req.body.pricePerHour);
            if (!Number.isFinite(pricePerHour) || pricePerHour < 0) {
                return res.status(400).json({ message: "Invalid price." });
            }
            updates.pricePerHour = pricePerHour;
        }

        if (req.file) {
            updates.image = req.file.filename;
        }

        Object.assign(court, updates);
        await court.save();

        if (req.file && oldImage) {
            removeImage(oldImage);
        }

        res.status(200).json({ message: "Court updated successfully.", court });
    } catch (error) { next(error); }
};

// Delete Court (Admin)
export const deleteCourt = async (req, res, next) => {
    try {
        const court = await Court.findByIdAndDelete(req.params.id);
        if (!court) {
            return res.status(404).json({ message: "Court not found." });
        }
        await Booking.deleteMany({ court: court._id });
        removeImage(court.image);
        res.status(200).json({ message: "Court deleted successfully." });
    } catch (error) { next(error); }
};
