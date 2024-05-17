const Account = require("../models/Accounts");
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
  const account = await Account.find({user:id});
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


const createAccount = async (req, res) => {
  const { user, type, balance, status } = req.body;

  if (!user || !type || balance === undefined || !status) {
    console.log("Create Account Error: Missing fields");
    return res.status(400).json({
      error: "All fields are required: user, type, balance, status.",
    });
  }

  const validTypes = ["Checking", "Savings", "Credit Card", "Loan"];
  const validStatuses = ["Active", "Closed", "Suspended"];

  if (!validTypes.includes(type) || !validStatuses.includes(status)) {
    console.log(
      `Create Account Error: Invalid type or status - Type: ${type}, Status: ${status}`
    );
    return res.status(400).json({
      error: "Invalid account type or status provided.",
    });
  }

  if (type === "Credit Card" && balance < 0) {
    console.log("Create Account Error: Negative balance for Credit Card");
    return res.status(400).json({
      error: "Credit Card accounts cannot have a negative opening balance.",
    });
  }

  try {
    const account = await Account.create({ user, type, balance, status });
    console.log(`Account Created: ID ${account._id}`);
    res.status(201).json(account);
  } catch (err) {
    console.error("Failed to create account:", err);
    res.status(500).json({
      error: "Server error: " + err.message,
    });
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
  createAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount,
  getAccountByQr
};
