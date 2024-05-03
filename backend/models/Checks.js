const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checksSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    payee: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "used"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Checks", checksSchema);
