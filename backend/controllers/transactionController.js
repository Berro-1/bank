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

const getLatestTransactions = async (req, res) => {
  const { accountId } = req.params;
  try {
    // Check if the accountId exists in Accounts, Loans, or Credit Cards
    const accountExists = await Account.findById(accountId).lean().exec();
    const loanExists = await Loan.findById(accountId).lean().exec();
    const creditCardExists = await CreditCard.findById(accountid).lean().exec();

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
      .populate({
        path: "second_account",
        populate: {
          path: "user",
          select: "name",
          match: { _id: { $exists: true } },
        },
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();

    const enhancedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        if (!transaction.second_account) {
          // Attempt to find in CreditCards or Loans if not populated
          const card = await CreditCard.findById(transaction.second_account)
            .lean()
            .exec();
          const loan = card
            ? null
            : await Loan.findById(transaction.second_account).lean().exec();
          transaction.second_account = card || loan || "Not found";
        }
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
// const getAllTransactions = async (req, res) => {
//   const { accountId } = req.params;
//   try {
//     const transactions = await Transaction.find({ account: accountId })
//       .populate({
//         path: "account",
//         populate: {
//           path: "user",
//           select: "name",
//         },
//       })
//       .sort({ createdAt: -1 })
//       .lean()
//       .exec();

//     const detailedTransactions = await Promise.all(
//       transactions.map(async (transaction) => {
//         // Initialize second_account_info to 'Not found' by default
//         let second_account_info = "Not found";

//         // First, attempt to populate from Account
//         const accountDetails = await Account.findById(
//           transaction.second_account
//         )
//           .populate({
//             path: "user",
//             select: "name email -_id",
//           })
//           .lean()
//           .exec();

//         if (accountDetails) {
//           second_account_info = {
//             type: "Account",
//             accountDetails: {
//               ...accountDetails,
//               user: accountDetails.user,
//             },
//           };
//         } else {
//           // If not an account, check if it's a Credit Card
//           const cardDetails = await CreditCard.findById(
//             transaction.second_account
//           )
//             .populate("user", "name email -_id")
//             .lean()
//             .exec();

//           if (cardDetails) {
//             second_account_info = {
//               type: "Credit Card",
//               cardDetails: {
//                 cardName: cardDetails.card_name,
//                 user: cardDetails.user,
//               },
//             };
//           } else {
//             // Lastly, check if it's a Loan
//             const loanDetails = await Loan.findById(transaction.second_account)
//               .populate("user", "name email -_id")
//               .lean()
//               .exec();

//             if (loanDetails) {
//               second_account_info = {
//                 type: "Loan",
//                 loanDetails: {
//                   loanType: loanDetails.loan_type,
//                   user: loanDetails.user,
//                 },
//               };
//             }
//           }
//         }

//         // Attach the populated second_account_info to the transaction
//         transaction.second_account_info = second_account_info;
//         return transaction;
//       })
//     );

//     if (!detailedTransactions.length) {
//       return res
//         .status(404)
//         .json({ error: "No transactions found for this account" });
//     }

//     res.status(200).json(detailedTransactions);
//   } catch (err) {
//     console.error("Error finding transactions:", err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }
// };
const getAllTransactions = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve all transactions where the account or credit card is either the sender or receiver
    const transactions = await Transaction.find({
      $or: [{ sender: id }, { receiver: id }],
    });

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
