const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path according to your project structure

const authUserOrAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_VALUE

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'user' || user.role === 'admin') {
            req.user = user; // Save the user document into the request object
            next(); // Proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Access denied. You do not have the proper role.' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authUserOrAdmin;
