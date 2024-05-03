const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const investmentSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Stocks", "Bonds", "Real Estate", "Mutual Funds"], // Assuming typical investment types
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investment", investmentSchema);
