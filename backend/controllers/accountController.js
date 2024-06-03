const User = require("../models/User");
const Account = require("../models/Accounts");
const Loans = require("../models/Loans"); // Corrected import path
const mongoose = require("mongoose");

// Ensure only one account of each type can be created per user
const ensureSingleAccountType = async (userId, accountType) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return false; // Return false if the user ID is not valid
  }
  const existingAccount = await Account.findOne({
    user: userId,
    type: accountType,
  });
  return !existingAccount; // Return true if no account exists, false otherwise
};

// Fetch all accounts sorted by creation date
const getAccounts = async (req, res) => {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(accounts);
};

// Fetch accounts for a specific user
const getUserAccounts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No account with that id" });
  }
  const accounts = await Account.find({ user: id });
  if (!accounts.length) {
    return res.status(404).json({ error: "No accounts found for this user" });
  }
  res.status(200).json(accounts);
};

// Fetch a single account by account ID provided in query
const getAccountByQr = async (req, res) => {
  const { accountId } = req.query;
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(404).json({ error: "Invalid account ID provided" });
  }
  const account = await Account.findById(accountId);
  if (!account) {
    return res.status(404).json({ error: "No account found with that ID" });
  }
  res.status(200).json(account);
};

// Fetch a single account by ID from parameters
const getAccountById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid account ID provided" });
  }
  const account = await Account.findById(id);
  if (!account) {
    return res.status(404).json({ error: "No account found with that ID" });
  }
  res.status(200).json(account);
};

// Create a new loan account, checking eligibility
const createLoanAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
      const { user } = req.params;
console.log(user);
    const {  type, amount, loan_term } = req.body;
    if (!user || !type || !amount || !loan_term) {
      throw new Error("All fields are required.");
    }

    const userDoc = await User.findById(user);
    if (!userDoc || !userDoc.is_eligible_for_loan) {
      throw new Error("User is not eligible for a loan.");
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

    await newLoan.save({ session });

    // Update user eligibility
    userDoc.is_eligible_for_loan = false;
    await userDoc.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(newLoan);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

// Create a new account (savings or checking)
const createAccount = async (req, res) => {
  try {
    const user = req.params.id;
    console.log(user);
    const { balance, accountType } = req.body; // accountType should be 'Savings' or 'Checking'
    if (!user || !balance || !accountType) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!(await ensureSingleAccountType(user, accountType))) {
      return res
        .status(400)
        .json({ error: `User already has a ${accountType} account.` });
    }

    const newAccount = new Account({
      user,
      balance,
      type: accountType,
      status: "Active",
    });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an account by ID
const deleteAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No account with that id" });
  }
  const account = await Account.findOneAndDelete({ _id: id });
  if (!account) {
    return res.status(404).json({ error: "No account with that id" });
  }
  res.status(200).json({ message: "Account deleted successfully" });
};

// Update an account details
const updateAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Account with that id" });
  }
  const account = await Account.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!account) {
    return res.status(404).json({ error: "No Account found with that id" });
  }
  res.status(200).json(account);
};

module.exports = {
  createAccount,
  createLoanAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount,
  getAccountByQr,
  getAccountById,
};
