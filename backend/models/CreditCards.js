const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditCardsSchema = new Schema(
  {
    card_name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    credit_limit: {
      type: Number,
      required: true,
    },
    available_credit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CreditCard", creditCardsSchema);
