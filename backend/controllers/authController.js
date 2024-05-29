const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};

const signup = async (req, res) => {
  const { name, password, email, address, phone_number, role } = req.body;

  // Input Validation
  if (!name || !password || !email || !address || !phone_number || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate role
  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  try {
    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      address,
      phone_number,
      role,
    });
    const token = createToken(user._id);

    // You might want to exclude the password from the response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone_number: user.phone_number,
      type: user.type,
      is_eligible_for_loan: user.is_eligible_for_loan,
      is_first_login: user.is_first_login,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: token,
    };

    res.status(201).json(userResponse);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      // Check for duplicate key error
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: "User not created", error: err.message });
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
            role: user.role
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
  login,
  logout,
};
