const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loansSchema = new Schema(
  {
    loan_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    intrest_rate: {
      type: Number,
      required: true,
    },
    loan_term: {
      type: Number,
      required: true,
        },
    loan_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loans", loansSchema);
