const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loansSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Personal", "Mortgage", "Auto", "Education"],
    },
    amount: {
      type: Number,
      required: true,
    },
    interest_rate: {
      type: Number,
      required: true,
    },
    loan_term: {
      type: Number, 
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Closed", "In Default"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loans", loansSchema);
