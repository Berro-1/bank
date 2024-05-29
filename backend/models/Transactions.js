const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    second_account: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transfer_type: {
      type: String,
      required: true,
      enum: ["Received", "Sent"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Withdrawal", "Transfer", "Payment", "Loan Payment"], // Include "Loan Payment"
    },
    account_name: {
      type: String,
    },
    second_account_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
