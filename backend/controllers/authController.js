const User = require("../models/User");
const pendingUser = require("../models/PendingUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { startSession } = require("mongoose");
const { sendEmailMobile } = require("./email");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};

// Configure storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Go up one level from the backend directory and then into the uploads directory
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only JPEG, PNG & GIF files are allowed!");
    }
  },
}).fields([
  { name: "selfie", maxCount: 1 },
  { name: "idFront", maxCount: 1 },
  { name: "idBack", maxCount: 1 },
]);

const signup = async (req, res) => {
  const { name, address, phone_number, email, type, DOB } = req.body;

  try {
    const images = [
      req.files["selfie"] ? req.files["selfie"][0].path : null,
      req.files["idFront"] ? req.files["idFront"][0].path : null,
      req.files["idBack"] ? req.files["idBack"][0].path : null,
    ].filter(Boolean); // Filter out any null values

    const user = new pendingUser({
      name,
      address,
      phone_number,
      email,
      type,
      images, // Add the image paths to the new user object
      DOB,
    });
    await user.save();

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone_number: phone_number,
      type: user.type,
      images: user.images, // Include image paths in the response
      DOB: user.DOB,
      is_eligible_for_loan: user.is_eligible_for_loan,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json(userResponse);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (err.name === "ValidationError") {
      let messages = Object.values(err.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ message: "User not created", errors: messages });
    } else {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }
};

const deletePendingUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pendingUser.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Update a user
const updatePendingUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const session = await startSession(); // Start a session for transaction

  try {
    session.startTransaction(); // Start the transaction

    const user = await pendingUser.findByIdAndUpdate(id, updates, {
      new: true,
      session, // Pass session to this query to be part of the transaction
    });

    if (!user) {
      await session.abortTransaction(); // Abort transaction if user not found
      session.endSession();
      return res.status(404).json({ error: "No user found" });
    }
    subject = "Account activation";
    text = "congratz on ur account,hop on the app to login";
    to = user.email;
    if (updates.status === "Approved") {
      const newUser = new User({
        name: user.name,
        password: user.password,
        email: user.email,
        address: user.address,
        phone_number: user.phone_number,
        DOB: user.DOB,
        is_eligible_for_loan: user.is_eligible_for_loan,
        role: user.role,
        images: user.images,
      });

      await newUser.save({ session }); // Include this operation in the transaction

      await pendingUser.findByIdAndDelete(user._id, { session });
      sendEmailMobile(to, subject, text);
    }

    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    res.status(200).json(user);
  } catch (err) {
    await session.abortTransaction(); // Abort transaction on error
    session.endSession();
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await pendingUser.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Get a single user by id
const getPendingUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pendingUser.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password are required" });
  }

  try {
    // Check if the user exists with the given email
    const user = await User.findOne({ email });

    if (user) {
      // Compare provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Create a token
        const token = createToken(user._id);

        // Send the token and user details in the response
        res.status(200).json({
          message: "Login successful",
          token: token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        // Passwords do not match
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      // No user found with this email
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logout = () => {
  localStorage.removeItem("jwtToken");
};

module.exports = {
  signup,
  upload,
  login,
  logout,
  getPendingUser,
  getPendingUsers,
  deletePendingUser,
  updatePendingUser,
};
