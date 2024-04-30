const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    // Other fields in the account schema
    account_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer", // Refers to the Customer model (collection)
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
        },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
