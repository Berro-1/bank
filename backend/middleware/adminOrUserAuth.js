const authenticate = require("./authenticate");
function adminOrUserAuth(req, res, next) {
  // Enhance to handle admin or user with direct checks in one function, or keep separate and manage flow directly.
  authenticate(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "user") {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Access denied. Insufficient privileges." });
    }
  });
}
module.exports = adminOrUserAuth;
