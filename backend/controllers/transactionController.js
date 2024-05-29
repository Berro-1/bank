const mongoose = require("mongoose");
const Transaction = require("../models/Transactions");
const Account = require("../models/Accounts");
const CreditCard = require("../models/CreditCards");
const User = require("../models/User");
const Loan = require("../models/Loans");

const getUserNameByAccountId = async (accountId) => {
  try {
    let userId = null;

    // Find the account by ID
    const account = await Account.findById(accountId).exec();
    if (account) {
      userId = account.user;
    } else {
      // If account not found, find the loan by ID
      const loan = await Loan.findById(accountId).exec();
      if (loan) {
        userId = loan.user;
      } else {
        throw new Error("Account or Loan not found");
      }
    }

    // Find the user by the user ID
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }

    // Return the user's name
    return user.name;
  } catch (error) {
    console.error("Error fetching user name:", error);
    throw error;
  }
};

const createTransaction = async (req, res) => {
  const { accountId } = req.params;
  const { amount, type, second_account } = req.body;

  // Validate request body
  if (!amount || !type || !second_account) {
    return res.status(400).json({
      error: "All fields must be provided: amount, type, second_account",
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
      receiverAccount = await Account.findById(second_account).session(session);
      if (!receiverAccount) {
        receiverCard = await CreditCard.findById(second_account).session(
          session
        );
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

    // Retrieve names for sender and receiver
    const senderUserName = await getUserNameByAccountId(accountId);
    const receiverUserName = await getUserNameByAccountId(second_account);

    // Create the sender transaction
    const senderTransaction = new Transaction({
      account: senderAccount ? senderAccount._id : senderCard._id,
      second_account: second_account,
      amount: parsedAmount,
      type,
      transfer_type: "Sent",
      account_name: senderUserName,
      second_account_name: receiverUserName,
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
        second_account: senderAccount ? senderAccount._id : senderCard._id,
        amount: parsedAmount,
        type,
        transfer_type: "Received",
        account_name: receiverUserName,
        second_account_name: senderUserName,
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
    // Check if the accountId exists in Accounts or Loans
    const accountExists = await Account.findById(accountId).lean().exec();
    const loanExists = await Loan.findById(accountId).lean().exec();

    if (!accountExists && !loanExists) {
      return res.status(404).json({ error: "Account or loan not found" });
    }

    // Find transactions for the given accountId
    const transactions = await Transaction.find({ account: accountId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();

    if (!transactions.length) {
      return res
        .status(404)
        .json({ error: "No transactions found for this account or loan" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error finding transactions:", error);
    res.status(500).json({ error: "Server error: " + error.message });
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
