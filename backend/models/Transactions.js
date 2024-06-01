const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      refPath: 'senderModel',
      required: true,
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['Account', 'CreditCard'],
    },
    receiver: {
      type: Schema.Types.ObjectId,
      refPath: 'receiverModel',
      required: true,
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ['Account', 'CreditCard', 'Loan'],
    },
    amount: {
      type: Number,
      required: true,
    },
    senderTransferType: {
      type: String,
      required: true,
      enum: ["Sent"],
    },
    receiverTransferType: {
      type: String,
      required: true,
      enum: ["Received"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Withdrawal", "Transfer", "Payment", "Loan Payment"], // Include "Loan Payment"
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already compiled
module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
