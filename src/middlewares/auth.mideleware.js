import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const isAuth = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: "Not authorized, no token" });

            }
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
                console.log('the user is authenticated', req.user);

            }
            catch (error) {
                console.log("auth middleware error", error.message);
                res.status(500).json({ message: "Internal server error in auth middleware", error: error.message });
            }
        }
        else {
            console.log("auth middleware error", error.message);
            return res.status(401).json({ message: "Not authorized, no token" });
        }
    }
    catch (error) {
        console.log("auth middleware error", error.message);
        res.status(500).json({ message: "Internal server error in auth middleware", error: error.message });
    }
}