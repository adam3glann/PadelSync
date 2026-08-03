export const notFound = (req, res) => {
    res.status(404).json({ message: "Route not found." });
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.name === "ValidationError") return res.status(400).json({ message: err.message });
    if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID." });
    if (err.code === 11000) return res.status(409).json({ message: "This value already exists." });
    res.status(err.statusCode || 500).json({ message: err.message || "Server error." });
};
