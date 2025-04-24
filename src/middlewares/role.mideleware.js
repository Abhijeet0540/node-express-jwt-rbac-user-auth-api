
//role base auth
export const isManager = (...roles) => (req, res, next) => {
    try {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Not authorized, no token" });
        }
        next();
    }
    catch (error) {
        console.log("role middleware error", error.message);
        res.status(500).json({ message: "Internal server error in role middleware", error: error.message });
    }


}