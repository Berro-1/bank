const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const investmentSchema = new Schema(
  {
    investment_id: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investment", investmentSchema);
