const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loansSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
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
      type: Number, // in months or years, consider clarifying in documentation or field name
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
