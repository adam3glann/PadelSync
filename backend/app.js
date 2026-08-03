import https from "https";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";
import courtRoutes from "./routes/courtRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/api/auth", authRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.get("/api/weather", async (req, res) => {
    if (!process.env.OPENWEATHER_API_KEY) return res.status(503).json({ message: "Weather service is not configured." });
    try {
        const query = encodeURIComponent("Heliopolis,Cairo,EG");
        const key = process.env.OPENWEATHER_API_KEY;
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${key}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${key}`)
        ]);
        if (!currentResponse.ok || !forecastResponse.ok) throw new Error("Weather service is unavailable.");
        const current = await currentResponse.json();
        const forecast = await forecastResponse.json();
        res.json({ location: "Heliopolis, Cairo, Egypt", current: { temperature: Math.round(current.main.temp), description: current.weather[0].description, icon: current.weather[0].icon }, forecast: forecast.list.filter((item) => item.dt_txt.includes("12:00:00")).slice(0, 3).map((item) => ({ date: item.dt_txt.slice(0, 10), temperature: Math.round(item.main.temp), description: item.weather[0].description, icon: item.weather[0].icon })) });
    } catch (error) { res.status(503).json({ message: "Weather is temporarily unavailable. You can still reserve a court." }); }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const seedAdmin = async () => {
    const exists = await User.findOne({ email: "admin@padelsync.com" });
    if (!exists) await User.create({ fullName: "Club Manager", email: "admin@padelsync.com", password: await bcrypt.hash("admin123", 10), role: "admin" });
};

const startServer = async () => {
    await connectDB();
    await seedAdmin();

    if (process.env.NODE_ENV === "production") {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
        return;
    }

    const httpsOptions = {
        key: fs.readFileSync("./padelsync.local+2-key.pem"),
        cert: fs.readFileSync("./padelsync.local+2.pem"),
    };

    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log(`🚀 HTTPS Server running on https://padelsync.local:${PORT}`);
    });
};

startServer();