const User = require("../models/User");
const Account = require("../models/Accounts");
const Loans = require("../models/Loans");
const mongoose = require("mongoose");

const getAccounts = async (req, res) => {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(accounts);
};
const getUserAccounts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No account with that id" });
  }
  const account = await Account.find({ user: id });
  if (!account) {
    return res.status(404).json({ err: "No account with that id" });
  }
  res.status(200).json(account);
};
const getAccountByQr = async (req, res) => {
  // Extract account ID from query parameters
  const { accountId } = req.query;

  // Validate the account ID
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(404).json({ error: "Invalid account ID provided" });
  }

  // Fetch the account from the database
  const account = await Account.findById(accountId);
  if (!account) {
    return res.status(404).json({ error: "No account found with that ID" });
  }

  // Return the account details
  res.status(200).json(account);
};
// Fetch a single account by ID
const getAccountById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid account ID provided" });
  }
  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ error: "No account found with that ID" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLoanAccount = async (req, res) => {
  const session = await mongoose.startSession(); // Start a new session
  session.startTransaction(); // Start a transaction
  try {
    const { user, type, amount, loan_term } = req.body;
    if (!user || !type || !amount || !loan_term) {
      throw new Error("All fields are required.");
    }

    const interest_rate = (loan_term / 12) * 4;

    const newLoan = new Loans({
      user,
      type,
      amount,
      interest_rate,
      loan_term,
      status: "Active",
    });

    await newLoan.save({ session }); // Save using the session to include this in the transaction

    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session

    res.status(201).json(newLoan);
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction
    session.endSession(); // End the session
    res.status(500).json({ error: error.message });
  }
};


const createSavingsAccount = async (req, res) => {
  try {
    const { user, balance, interest_rate } = req.body;
    if (!user || !balance || !interest_rate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newSavings = new Savings({
      user,
      balance,
      interest_rate,
      status: "Active",
    });
    await newSavings.save();
    res.status(201).json(newSavings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCheckingAccount = async (req, res) => {
  try {
    const { user, balance } = req.body;
    if (!user || !balance) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newChecking = new Checking({ user, balance, status: "Active" });
    await newChecking.save();
    res.status(201).json(newChecking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No account with that id" });
  }
  const account = await Account.findOneAndDelete({ _id: id });
  if (!account) {
    return res.status(404).json({ err: "No account with that id" });
  }
  res.status(200).json(account);
};

const updateAccount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Account with that id" });
  }
  const account = await Account.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!account) {
    return res.status(404).json({ err: "No Account with that id" });
  }
  res.status(200).json(account);
};

module.exports = {
  createSavingsAccount,
  createCheckingAccount,
  createLoanAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount,
  getAccountByQr,
  getAccountById,
};
