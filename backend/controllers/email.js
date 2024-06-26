const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const serviceAccount = require("../safestream-hadi-firebase-adminsdk-sy4qu-7473dca255.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const OTP = require("../models/OTP");

async function sendOTP(targetEmail) {
  try {
    // Check if an active OTP already exists for this email
    const existingOTP = await OTP.findOne({
      email: targetEmail,
      is_usable: true,
    });
    if (existingOTP) {
      // If OTP exists and is active, return an error response instead of throwing an error
      console.error(
        "An OTP has already been sent to this email and is still active."
      );
      return {
        success: false,
        message:
          "An OTP has already been sent to this email and is still active.",
      };
    }

    // Generate a new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // Save new OTP to the database
    const otpEntry = new OTP({
      email: targetEmail,
      OTP: otpCode,
    });
    await otpEntry.save();

    // Send OTP via email
    await sendEmail({
      to: targetEmail,
      subject: "Your OTP",
      text: `Your OTP is: ${otpCode}`,
    });
    console.log("OTP sent to email successfully");
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Failed to send OTP", error);
    return {
      success: false,
      message: error.message || "Failed to send OTP due to an error.",
    };
  }
}
async function sendEmailMobile(to, subject, text) {
  console.log("to:", to, "subject", subject, "text", text);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Use environment variables
      pass: process.env.GMAIL_PASS, // Use environment variables
    },
  });

  let info = await transporter.sendMail({
    from: `"SafeStream" <Hadikarnib03@gmail.com>`, // Use the Gmail user from the environment
    to: to,
    subject: subject,
    text: text,
    // html: "<b>Hello world?</b>" // Optional HTML content
  });

  console.log("Message sent: %s", info.messageId);
}
async function sendEmail({ to, subject, text }) {
  console.log("to:", to, "subject", subject, "text", text);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Use environment variables
      pass: process.env.GMAIL_PASS, // Use environment variables
    },
  });

  let info = await transporter.sendMail({
    from: `"SafeStream" <Hadikarnib03@gmail.com>`, // Use the Gmail user from the environment
    to: to,
    subject: subject,
    text: text,
    // html: "<b>Hello world?</b>" // Optional HTML content
  });

  console.log("Message sent: %s", info.messageId);
}
async function verifyOTP(email, otpCode) {
  try {
    // Find the OTP entry for the email that is usable
    const otpEntry = await OTP.findOne({ email: email, is_usable: true });

    if (!otpEntry) {
      throw new Error("OTP is either expired or does not exist.");
    }

    // Check if the provided OTP matches the stored OTP
    if (otpEntry.OTP === otpCode) {
      // Update the OTP as used
      otpEntry.is_usable = false;
      await otpEntry.save();
      console.log("OTP verified successfully, and marked as used.");
      return true; // OTP verified
    } else {
      throw new Error("Incorrect OTP provided.");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return false; // OTP verification failed
  }
}

module.exports = {
  sendOTP,
  verifyOTP,
  sendEmail,
  sendEmailMobile,
};
