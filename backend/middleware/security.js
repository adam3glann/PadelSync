// Security headers applied to every response.
export const securityHeaders = (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-XSS-Protection", "0");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
};

// CORS: allow the app's own development origins (any localhost port and the
// file:// origin used when pages are opened directly) plus anything listed in
// the CORS_ORIGIN environment variable (comma separated).
export const corsOptions = {
    origin(origin, callback) {
        if (!origin) return callback(null, true);
        const allowed = (process.env.CORS_ORIGIN || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        if (allowed.includes(origin)) return callback(null, true);
        if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(origin)) return callback(null, true);
        if (origin === "null") return callback(null, true);
        return callback(null, false);
    }
};
