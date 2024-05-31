const mongoose = require("mongoose");
const Transaction = require("../models/Transactions");
const Account = require("../models/Accounts");
const CreditCard = require("../models/CreditCards");
const User = require("../models/User");
const Loan = require("../models/Loans");

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

    // Create the sender transaction
    const senderTransaction = new Transaction({
      account: senderAccount ? senderAccount._id : senderCard._id,
      second_account: second_account,
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
        second_account: senderAccount ? senderAccount._id : senderCard._id,
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
    // Check if the accountId exists in Accounts, Loans, or Credit Cards
    const accountExists = await Account.findById(accountId).lean().exec();
    const loanExists = await Loan.findById(accountId).lean().exec();
    const creditCardExists = await CreditCard.findById(accountId).lean().exec();

    if (!accountExists && !loanExists && !creditCardExists) {
      return res
        .status(404)
        .json({ error: "Account, loan, or credit card not found" });
    }

    // Find transactions for the given accountId
    const transactions = await Transaction.find({
      $or: [{ account: accountId }, { second_account: accountId }],
    })
      .populate({
        path: "account",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();

    const enhancedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        let second_account_info = "Not found";

        // Populate second_account details based on type (Account, CreditCard, Loan)
        const accountDetails = await Account.findById(
          transaction.second_account
        )
          .populate("user", "name email -_id")
          .lean()
          .exec();

        if (accountDetails) {
          second_account_info = {
            type: "Account",
            details: accountDetails,
          };
        } else {
          const cardDetails = await CreditCard.findById(
            transaction.second_account
          )
            .populate("user", "name email -_id")
            .lean()
            .exec();

          if (cardDetails) {
            second_account_info = {
              type: "Credit Card",
              details: {
                cardName: cardDetails.card_name,
                user: cardDetails.user,
              },
            };
          } else {
            const loanDetails = await Loan.findById(transaction.second_account)
              .populate("user", "name email -_id")
              .lean()
              .exec();

            if (loanDetails) {
              second_account_info = {
                type: "Loan",
                details: {
                  loanType: loanDetails.loan_type,
                  user: loanDetails.user,
                },
              };
            }
          }
        }

        transaction.second_account_info = second_account_info;
        return transaction;
      })
    );

    if (!enhancedTransactions.length) {
      return res.status(404).json({
        error: "No transactions found for this account, loan, or credit card",
      });
    }

    res.status(200).json(enhancedTransactions);
  } catch (error) {
    console.error("Error finding transactions:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

const getAllTransactions = async (req, res) => {
  const { accountId } = req.params;
  try {
    const accountExists = await Account.findById(accountId).lean().exec();
    const loanExists = await Loan.findById(accountId).lean().exec();
    const cardExists = await CreditCard.findById(accountId).lean().exec();

    if (!accountExists && !loanExists && !cardExists) {
      return res
        .status(404)
        .json({ error: "Account, loan, or credit card not found" });
    }

    const transactions = await Transaction.find({
      $or: [{ account: accountId }, { second_account: accountId }],
    })
      .populate({
        path: "account",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    const detailedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        let second_account_info = "Not found";

        const accountDetails = await Account.findById(
          transaction.second_account
        )
          .populate("user", "name email -_id")
          .lean()
          .exec();

        const secondAccountId = transaction.second_account
          ? transaction.second_account.toString()
          : null;
        const primaryAccountId = transaction.account
          ? transaction.account._id.toString()
          : null;

        if (accountDetails) {
          second_account_info = {
            type: "Account",
            details: accountDetails,
            transfer_type: primaryAccountId === accountId ? "Sent" : "Received",
          };
        } else {
          const cardDetails = await CreditCard.findById(
            transaction.second_account
          )
            .populate("user", "name email -_id")
            .lean()
            .exec();

          if (cardDetails) {
            second_account_info = {
              type: "Credit Card",
              details: cardDetails,
              transfer_type:
                primaryAccountId === accountId ? "Sent" : "Received",
            };
          } else {
            const loanDetails = await Loan.findById(transaction.second_account)
              .populate("user", "name email -_id")
              .lean()
              .exec();

            if (loanDetails) {
              second_account_info = {
                type: "Loan",
                details: loanDetails,
                transfer_type:
                  primaryAccountId === accountId ? "Sent" : "Received",
              };
            }
          }
        }

        return {
          ...transaction,
          second_account_info,
        };
      })
    );

    if (!detailedTransactions.length) {
      return res
        .status(404)
        .json({ error: "No transactions found for this identifier" });
    }

    res.status(200).json(detailedTransactions);
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
