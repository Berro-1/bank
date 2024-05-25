const savingsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    interest_rate: {
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

module.exports = mongoose.model("Savings", savingsSchema);
