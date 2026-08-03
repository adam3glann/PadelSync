import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";
import courtRoutes from "./routes/courtRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { securityHeaders, corsOptions } from "./middleware/security.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Fail fast with a clear message when required configuration is missing.
const missingEnv = ["MONGO_URI", "JWT_SECRET"].filter((key) => !process.env[key]);
if (missingEnv.length) {
    console.error(`Missing required environment variable(s): ${missingEnv.join(", ")}`);
    console.error("Copy backend/.env.example to backend/.env and fill in the values.");
    process.exit(1);
}

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "..", "frontend")));
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

// Test Route
app.get("/", (req, res) => {
    res.json({ message: "PadelSync Backend is Running 🚀" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Seed the first administrator from environment variables. No credentials are
// hardcoded in the source. If the variables are missing a warning is printed.
const seedAdmin = async () => {
    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "";
    if (!adminEmail || !adminPassword) {
        if (!(await User.findOne({ role: "admin" }))) {
            console.warn("No administrator exists and ADMIN_EMAIL/ADMIN_PASSWORD are not set. Set them in backend/.env and restart.");
        }
        return;
    }
    try {
        const exists = await User.findOne({ email: adminEmail });
        if (!exists) {
            await User.create({ fullName: "Club Manager", email: adminEmail, password: await bcrypt.hash(adminPassword, 10), role: "admin" });
            console.log("Seeded administrator account.");
        }
    } catch (error) {
        console.error("Failed to seed administrator:", error.message);
    }
};

const startServer = async () => {
    await connectDB();
    await seedAdmin();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
});
