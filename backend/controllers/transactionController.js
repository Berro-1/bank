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



const getAllTransactions = async (req, res) => {
  const { accountId } = req.params;
  try {
    const transactions = await Transaction.find({ account: accountId });
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found for this account" });
    }
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error finding transactions:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};





// const updateTransaction = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const transaction = await Transaction.findByIdAndUpdate(id, updates, {
//       new: true,
//     });
//     if (!transaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }
//     res.status(200).json(transaction);
//   } catch (err) {
//     console.error("Error updating transaction:", err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }
// };
module.exports = {
  createTransaction,
  getAllTransactions,
};
