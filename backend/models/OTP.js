const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator"); // Import the validator library

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please provide a valid email",
      },
      unique: true,
    },

    OTP: {
      type: String,
      required: true,
    },

    is_usable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OTP", OTPSchema);
