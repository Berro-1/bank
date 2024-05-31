const authenticate = require('./authenticate');

const adminAuth = (req, res, next) => {
    authenticate(req, res, () => {
        if (req.user.role === 'admin') {
            next(); 
        } else {
            res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
    });
};

module.exports = adminAuth;