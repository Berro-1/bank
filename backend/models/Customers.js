const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      match: [
        /^(01|03|70|71|76|78|79|81)\d{6}$/, // Mobile numbers start with 03, 70, 71, 76, 78, or 79
        "Please enter a valid Lebanese phone number",
      ],
    },
    
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
