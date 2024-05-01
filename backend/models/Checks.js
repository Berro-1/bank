const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checksSchema = new Schema(
  {
    check_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    account_id: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Checks", checksSchema);
