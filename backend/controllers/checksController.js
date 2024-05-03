const Check = require("../models/Checks");
const mongoose = require("mongoose");

//get all checks
const getChecks = async (req, res) => {
  try {
    const checks = await Check.find({}).sort({ createdAt: -1 });
    res.status(200).json(checks);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch checks: " + err.message });
  }
};

//create new check
const createCheck = async (req, res) => {
  const { accountId } = req.params;
  const { payee, amount } = req.body;

  try {
    const check = await Check.create({ account: accountId, payee, amount });
    res.status(201).json(check);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Unable to create check: " + err.message });
  }
};

//delete  a specific workout
const deleteCheck = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No check with that id" });
  }

  const check = await Check.findOneAndDelete({ _id: id });
  if (!check) {
    return res.status(404).json({ error: "No check found with that id" });
  }
  res.status(200).json(check);
};

//update  an existing workout
const updateCheck = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No check with that id" });
  }

  const check = await Check.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!check) {
    return res.status(404).json({ error: "No check found with that id" });
  }
  res.status(200).json(check);
};

module.exports = {
  getChecks,
  createCheck,
  deleteCheck,
  updateCheck,
};
