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

//create  new workout
const createAccount = async (req, res) => {
  const { type, balance, status } = req.body;
  try {
    const account = await Account.create({ type, balance, status });
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete  a specific workout
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
//update  an existing workout
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
