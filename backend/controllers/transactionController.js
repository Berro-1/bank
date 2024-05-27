const mongoose = require("mongoose");
const Transaction = require("../models/Transactions");
const Account = require("../models/Accounts");
const CreditCard = require("../models/CreditCards");
const User = require("../models/User");

const createTransaction = async (req, res) => {
  const { accountId } = req.params;
  const { amount, type, receiver_acc } = req.body;

  // Validate request body
  if (!amount || !type || !receiver_acc) {
    return res.status(400).json({
      error: "All fields must be provided: amount, type, receiver_acc",
    });
  }

  // Parse amount to ensure it's a number
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Retrieve the sender account or credit card
    let senderAccount = await Account.findById(accountId).session(session);
    let senderCard = null;
    let senderUser = null;

    if (!senderAccount) {
      senderCard = await CreditCard.findById(accountId).session(session);
      if (!senderCard) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ error: "Sender account or card not found" });
      }
      senderUser = await User.findById(senderCard.user).session(session);
      if (!senderUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: "Sender user not found" });
      }
      if (
        (type === "Withdrawal" || type === "Transfer") &&
        parseFloat(senderCard.available_credit) < parsedAmount
      ) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "Insufficient credit" });
      }
    } else {
      senderUser = await User.findById(senderAccount.user).session(session);
      if (!senderUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: "Sender user not found" });
      }
      if (
        (type === "Withdrawal" || type === "Transfer") &&
        parseFloat(senderAccount.balance) < parsedAmount
      ) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "Insufficient funds" });
      }
    }

    // Retrieve the receiver account or credit card and user for transfer transactions
    let receiverAccount = null;
    let receiverUser = null;
    let receiverCard = null;
    if (type === "Transfer") {
      receiverAccount = await Account.findById(receiver_acc).session(session);
      if (!receiverAccount) {
        receiverCard = await CreditCard.findById(receiver_acc).session(session);
        if (!receiverCard) {
          await session.abortTransaction();
          session.endSession();
          return res
            .status(404)
            .json({ error: "Receiver account or card not found" });
        }
        receiverUser = await User.findById(receiverCard.user).session(session);
        if (!receiverUser) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({ error: "Receiver user not found" });
        }
      } else {
        receiverUser = await User.findById(receiverAccount.user).session(
          session
        );
        if (!receiverUser) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({ error: "Receiver user not found" });
        }
      }
    }

    // Create the sender transaction
    const senderTransaction = new Transaction({
      account: senderAccount ? senderAccount._id : senderCard._id,
      receiver_acc: receiverUser ? receiverUser.name : receiver_acc,
      amount: parsedAmount,
      type,
      transfer_type: "Sent",
    });

    // Save the sender transaction
    await senderTransaction.save({ session });

    // Update the sender account balance or credit card available credit if necessary
    if (type === "Withdrawal" || type === "Transfer") {
      if (senderAccount) {
        senderAccount.balance =
          parseFloat(senderAccount.balance) - parsedAmount;
        await senderAccount.save({ session });
      } else if (senderCard) {
        senderCard.available_credit =
          parseFloat(senderCard.available_credit) - parsedAmount;
        await senderCard.save({ session });
      }
    }

    // Create the receiver transaction if it's a transfer
    let receiverTransaction = null;
    if (type === "Transfer") {
      if (receiverAccount) {
        receiverAccount.balance =
          parseFloat(receiverAccount.balance) + parsedAmount;
        await receiverAccount.save({ session });
      } else if (receiverCard) {
        receiverCard.available_credit =
          parseFloat(receiverCard.available_credit) + parsedAmount;
        await receiverCard.save({ session });
      }

      receiverTransaction = new Transaction({
        account: receiverAccount ? receiverAccount._id : receiverCard._id,
        receiver_acc: senderUser.name, // Use the sender's name
        amount: parsedAmount,
        type,
        transfer_type: "Received",
      });

      // Save the receiver transaction
      await receiverTransaction.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ senderTransaction, receiverTransaction });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const getLatestTransactions = async (req, res) => {
  const { accountId } = req.params;
  try {
    const transactions = await Transaction.find({ account: accountId })
      .sort({ createdAt: -1 })
      .limit(5);
    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found for this account" });
    }
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error finding transactions:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const getAllTransactions = async (req, res) => {
  const { accountId } = req.params;
  try {
    const transactions = await Transaction.find({ account: accountId }).sort({
      createdAt: -1,
    });
    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found for this account" });
    }
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error finding transactions:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getLatestTransactions,
};
