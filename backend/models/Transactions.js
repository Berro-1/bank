const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    transaction_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    account_id: {
      type: Schema.Types.ObjectId,
      ref: "Account", 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
