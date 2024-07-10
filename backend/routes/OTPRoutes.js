const express = require("express");
const router = express.Router();

// Import OTP-related functions
const { sendOTP, verifyOTP, sendEmail } = require("../controllers/email");

// Route to send OTP to a user's email
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const result = await sendOTP(email);
  res.status(result.success ? 200 : 400).json(result);
});
router.post("/sendEmail", async (req, res) => {
  const { to, Subject: subject, text } = req.body; // Ensure the keys match what `sendEmail` expects
  try {
    await sendEmail({ to, subject, text });
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).send("Failed to send email");
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
