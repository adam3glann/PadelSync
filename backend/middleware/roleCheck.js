// Role-check middleware.
// Must run AFTER `protect` (backend/middleware/auth.js), since it relies on req.user
// having already been attached from the verified JWT.

export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized. Please log in."
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied. You do not have permission to perform this action."
            });
        }

        next();
    };
};

// Members and admins can access member-facing features (admins can act as members too)
export const isMember = checkRole("member", "admin");

// Admin-only routes
export const isAdmin = checkRole("admin");
