const authenticate = require('./authenticate');

const userAuth = (req, res, next) => {
    authenticate(req, res, () => {  // First ensure authentication
        if (req.user.role === 'user' || req.user.role === 'admin') {
            next();  // User is authenticated and has the correct role
        } else {
            res.status(403).json({ message: 'Access denied. You do not have the proper role.' });
        }
    });
};

module.exports = userAuth;
