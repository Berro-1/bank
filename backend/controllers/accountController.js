const Account = require("../models/Accounts");
const mongoose = require("mongoose");

const getAccounts = async (req, res) => {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
const getCustomerAccounts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No account with that id" });
  }
  const account = await Account.findById(id);
  if (!account) {
    return res.status(404).json({ err: "No account with that id" });
  }
  res.status(200).json(account);
};

const createAccount = async (req, res) => {
  const { customer, type, balance, status } = req.body;

  if (!customer || !type || balance === undefined || !status) {
    return res
      .status(400)
      .json({
        error: "All fields are required: customer, type, balance, status.",
      });
  }

  const validTypes = ["Checking", "Savings", "Credit Card", "Loan"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid account type provided." });
  }

  const validStatuses = ["Active", "Closed", "Suspended"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid account status provided." });
  }

  if (type === "Credit Card" && balance < 0) {
    return res
      .status(400)
      .json({
        error: "Credit Card accounts cannot have a negative opening balance.",
      });
  }

  try {
    const account = await Account.create({ customer, type, balance, status });
    res.status(201).json(account);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Validation Error: " + err.message });
    } else {
      console.error("Failed to create account:", err);
      res.status(500).json({ error: "Server error: " + err.message });
    }
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
  getCustomerAccounts,
  deleteAccount,
  updateAccount,
};
