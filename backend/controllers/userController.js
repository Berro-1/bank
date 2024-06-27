const User = require("../models/User"); // Changed from Customer to User for clarity and consistency
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Get a single user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, address, phone_number, email, password, DOB, images } = req.body;

  try {
    const user = new pendingUsers({
      name,
      address,
      phone_number,
      email,
      password,
      DOB,
      images,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Email already exists. Please use a different email." });
    } else if (err.name === "ValidationError") {
      let messages = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({ error: messages.join(", ") });
    } else {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  }
};


// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, newEmail, newAddress, ...otherUpdates } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    // Handle password update
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Handle email update
    if (newEmail) {
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" });
      }
      user.email = newEmail;
    }

    // Handle address update
    if (newAddress) {
      user.address = newAddress;
    }

    // Handle other updates
    for (const key in otherUpdates) {
      if (otherUpdates.hasOwnProperty(key)) {
        user[key] = otherUpdates[key];
      }
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};



module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
