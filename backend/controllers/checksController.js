const Check = require("../models/Checks");
const mongoose = require("mongoose");

const getChecks= async (req, res) => {
  const { accountId } = req.params;
  try {
    const checks = await Check.find({ account: accountId }).sort({ createdAt: -1 });
    res.status(200).json(checks);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch checks: " + err.message });
  }
};


const createCheck = async (req, res) => {
  const { accountId } = req.params;
  const { payee, amount } = req.body;

  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({
        error: "Invalid amount specified. Amount must be a positive number.",
      });
  }

  try {
    const check = await Check.create({
      account: accountId,
      payee,
      amount,
      status: "pending",
    });
    res.status(201).json(check);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Unable to create check: " + err.message });
  }
};
const deleteCheck = async (req, res) => {
  const { checkId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(checkId)) {
    return res.status(404).json({ error: "No check with that id" });
  }

  try {
    const check = await Check.findById(checkId);
    console.log(check);
    if (!check) {
      return res.status(404).json({ error: "No check found with that id" });
    }

    if (check.status === "pending") {
      const deletedCheck = await Check.findOneAndDelete({ _id: checkId });
      res.status(200).json(deletedCheck);
    } else {
      res.status(400).json({ error: "Check has been withdrawn. Cannot delete check." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const updateCheck = async (req, res) => {
  const { checkId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(checkId)) {
    return res.status(404).json({ error: "No check with that id" });
  }

  const check = await Check.findOneAndUpdate(
    { _id: checkId },
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
