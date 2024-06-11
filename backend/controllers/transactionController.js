const mongoose = require("mongoose");

const Transaction = require("../models/Transactions");
const Account = require("../models/Accounts");
const CreditCard = require("../models/CreditCards");
const Loan = require("../models/Loans");
const User = require("../models/User");

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
    let senderModel = null;

    if (!senderAccount) {
      senderCard = await CreditCard.findById(accountId).session(session);
      if (!senderCard) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ error: "Sender account or card not found" });
      }
      senderModel = "CreditCard";
    } else {
      senderModel = "Account";
    }

    // Check for sufficient funds or credit
    if (
      senderAccount &&
      (type === "Withdrawal" || type === "Transfer") &&
      senderAccount.balance < parsedAmount
    ) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Insufficient funds" });
    }

    if (
      senderCard &&
      (type === "Withdrawal" || type === "Transfer") &&
      senderCard.available_credit < parsedAmount
    ) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Insufficient credit" });
    }

    // Retrieve the receiver account, credit card, or loan
    let receiverAccount = await Account.findById(second_account).session(
      session
    );
    let receiverCard = null;
    let receiverLoan = null;
    let receiverModel = null;

    if (!receiverAccount) {
      receiverCard = await CreditCard.findById(second_account).session(session);
      if (!receiverCard) {
        receiverLoan = await Loan.findById(second_account).session(session);
        if (!receiverLoan) {
          await session.abortTransaction();
          session.endSession();
          return res
            .status(404)
            .json({ error: "Receiver account, card, or loan not found" });
        }
        receiverModel = "Loan";
      } else {
        receiverModel = "CreditCard";
      }
    } else {
      receiverModel = "Account";
    }

    // Create the unified transaction
    const transaction = new Transaction({
      sender: senderAccount ? senderAccount._id : senderCard._id,
      senderModel,
      receiver: receiverAccount
        ? receiverAccount._id
        : receiverCard
        ? receiverCard._id
        : receiverLoan._id,
      receiverModel,
      amount: parsedAmount,
      type,
      senderTransferType: "Sent",
      receiverTransferType: "Received",
    });

    // Save the transaction
    await transaction.save({ session });

    // Update balances or available credit for the sender
    if (type === "Withdrawal" || type === "Transfer") {
      if (senderAccount) {
        senderAccount.balance -= parsedAmount;
        await senderAccount.save({ session });
      } else if (senderCard) {
        senderCard.available_credit -= parsedAmount;
        await senderCard.save({ session });
      }
    }

    // Update balances or available credit for the receiver
    if (type === "Transfer") {
      if (receiverAccount) {
        receiverAccount.balance += parsedAmount;
        await receiverAccount.save({ session });
      } else if (receiverCard) {
        receiverCard.available_credit += parsedAmount;
        await receiverCard.save({ session });
      } else if (receiverLoan) {
        // Assuming loan payment reduces the loan amount
        receiverLoan.amount -= parsedAmount;
        await receiverLoan.save({ session });
      }
    }

    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ transaction, message: "Transaction created successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const getAllTransactions = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve all transactions where the account or credit card is either the sender or receiver
    const transactions = await Transaction.find({
      $or: [{ sender: id }, { receiver: id }],
    }).sort({ createdAt: -1 });

    // Process the transactions to include user names
    const detailedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const sender = await getEntityDetails(
          transaction.sender,
          transaction.senderModel
        );
        const receiver = await getEntityDetails(
          transaction.receiver,
          transaction.receiverModel
        );

        return {
          ...transaction._doc,
          senderName: sender ? sender.user.name : null,
          receiverName: receiver ? receiver.user.name : null,
          senderUser: sender ? sender.user : null,
          receiverUser: receiver ? receiver.user : null,
        };
      })
    );

    res.status(200).json(detailedTransactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const getLatestTransactions = async (req, res) => {
  const { accountId } = req.params;

  try {
    const transactions = await Transaction.find({
      $or: [{ sender: accountId }, { receiver: accountId }],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const detailedTransactions = await Promise.all(transactions.map(async (transaction) => {
      const sender = await getEntityDetails(transaction.sender, transaction.senderModel);
      const receiver = await getEntityDetails(transaction.receiver, transaction.receiverModel);

      return {
        ...transaction._doc,
        senderName: sender ? sender.user.name : null,
        receiverName: receiver ? receiver.user.name : null,
        senderUser: sender ? sender.user : null,
        receiverUser: receiver ? receiver.user : null
      };
    }));

    res.status(200).json(detailedTransactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Helper function to retrieve and populate entity details
const getEntityDetails = async (entityId, model) => {
  let entity;

  if (model === "Account") {
    entity = await Account.findById(entityId).populate("user").exec();
  } else if (model === "CreditCard") {
    entity = await CreditCard.findById(entityId).populate("user").exec();
  } else if (model === "Loan") {
    entity = await Loan.findById(entityId).populate("user").exec();
  }

  return entity;
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getLatestTransactions,
};
