const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    receiver_acc: {
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
      enum: [ "Received", "Sent"],
    },
    type: {
      type: String,
      required: true,
      enum: [ "Withdrawal", "Transfer", "Payment"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
