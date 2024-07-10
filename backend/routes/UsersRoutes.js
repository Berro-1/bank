const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");

const adminAuth = require("../middleware/adminAuth"); // Make sure this is uncommented and correctly pathed
const userAuth = require("../middleware/userAuth"); // Make sure this is uncommented and correctly pathed
const adminOrUserAuth = require("../middleware/adminOrUserAuth");
// Routes configuration
// Get all users, only accessible to admins
router.get("/" ,adminAuth,getUsers);  // Apply adminAuth middleware here

// Get a single user by id
router.get("/:id", getUser);

// Create a user
router.post("/", createUser);

// Delete a user
router.delete("/:id", deleteUser);

// Update a user
router.patch("/:id", updateUser);

module.exports = router;
