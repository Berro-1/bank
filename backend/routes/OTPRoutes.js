const express = require("express");
const router = express.Router();

// Import OTP-related functions
const { sendOTP, verifyOTP } = require("../controllers/email");

// Route to send OTP to a user's email
router.post("/send-otp", async (req, res) => {
  try {
    await sendOTP(req.body.email); // Expect email in the request body
    res.status(200).send({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Route to verify OTP provided by the user
router.post("/verify-otp", async (req, res) => {
  try {
    const result = await verifyOTP(req.body.email, req.body.otpCode); // Expect email and otpCode in the request body
    if (result) {
      res
        .status(200)
        .send({ success: true, message: "OTP verified successfully" });
    } else {
      throw new Error("Failed to verify OTP");
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
