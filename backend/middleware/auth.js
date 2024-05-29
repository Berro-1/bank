const jwt = require('jsonwebtoken');

// Middleware to validate token and authenticate user
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_VALUE

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to check if the user is a general user
const userRole = (req, res, next) => {
    if (req.user.role === 'user' || req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. You do not have the proper role.' });
    }
};

// Middleware to check if the user is an admin
const adminRole = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
};

module.exports = { authenticate, userRole, adminRole };
