const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Checking", "Savings", "Loan"],
    },
    balance: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Closed", "Suspended"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
