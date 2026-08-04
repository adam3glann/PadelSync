// Simple in-memory sliding-window rate limiter. No external dependencies.
// Limits each client (IP) to `max` requests per `windowMs`.
const store = new Map();

const rateLimit = ({ windowMs = 60000, max = 20, message = "Too many requests, please try again later." } = {}) => {
    return (req, res, next) => {
        const ip = req.ip || req.socket.remoteAddress || "unknown";
        const now = Date.now();
        const entry = store.get(ip);

        if (!entry || entry.resetAt <= now) {
            store.set(ip, { count: 1, resetAt: now + windowMs });
            return next();
        }

        entry.count += 1;
        if (entry.count > max) {
            return res.status(429).json({ message });
        }
        next();
    };
};

// Periodically clear expired entries so the map does not grow forever.
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of store.entries()) {
        if (entry.resetAt <= now) store.delete(ip);
    }
}, 60000).unref();

export default rateLimit;
