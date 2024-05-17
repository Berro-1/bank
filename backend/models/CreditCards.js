const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditCardsSchema = new Schema(
  {
    card_number:{
      type: String,
      required: true,
      unique: true,
      match: [
        /^\d{16}$/,
        "Please enter a valid credit card number",
      ],
    },
    card_name: {
      type: String,
      required: true,
      enum: ["Platinum Card", "Gold Card", "Silver Card"],
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
