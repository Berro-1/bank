const mongoose = require("mongoose");
const Account = require("../models/Accounts");
const CreditCard = require("../models/CreditCards");
const Transaction = require("../models/Transactions");

const getUserTransactionsCount = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Missing user ID" });
  }

  try {
    // Fetch accounts and credit cards associated with the user
    const accounts = await Account.find({ user: userId });
    const creditCards = await CreditCard.find({ user: userId });

    // Extract IDs for accounts and credit cards
    const accountIds = accounts.map((account) => account._id);
    const cardIds = creditCards.map((card) => card._id);

    // Aggregate transactions where these IDs are either sender or receiver
    const transactionsCount = await Transaction.countDocuments({
      $or: [
        {
          sender: { $in: accountIds.concat(cardIds) },
          senderModel: { $in: ["Account", "CreditCard"] },
        },
        {
          receiver: { $in: accountIds.concat(cardIds) },
          receiverModel: { $in: ["Account", "CreditCard"] },
        },
      ],
    });

    res.status(200).json({ totalTransactions: transactionsCount });
  } catch (error) {
    console.error("Error while getting user transactions:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
module.exports = {
  getUserTransactionsCount
};