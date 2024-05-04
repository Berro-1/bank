const Transaction = require("../models/Transactions");

const createTransaction = async (req, res) => {
  const { accountId } = req.params;
  const { amount, type } = req.body;

  if (!amount || !type) {
    return res
      .status(400)
      .json({ error: "All fields must be provided: amount, type" });
  }

  try {
    const transaction = new Transaction({
      account: accountId,
      amount,
      type,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (err) {
    console.error("Error finding transaction:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const transaction = await Transaction.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};
module.exports = {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
};
