const Investment = require("../models/Investments");
const mongoose = require("mongoose");

const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({});
    res.status(200).json(investments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInvestment = async (req, res) => {
  const { id } = req.params;
  try {
    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ error: "No investment found" });
    }
    res.status(200).json(investment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createInvestment = async (req, res) => {
  const { customer, type, amount } = req.body;

  if (!customer || !type || !amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const validTypes = ["Stocks", "Bonds", "Real Estate", "Mutual Funds"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid type of investment." });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid amount. Amount must be a positive number." });
  }

  try {
    const investment = new Investment({ customer, type, amount });
    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteInvestment = async (req, res) => {
  const { id } = req.params;
  try {
    const investment = await Investment.findByIdAndDelete(id);
    if (!investment) {
      return res.status(404).json({ error: "No investment found" });
    }
    res.status(200).json({ message: "Investment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateInvestment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const investment = await Investment.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!investment) {
      return res.status(404).json({ error: "No investment found" });
    }
    res.status(200).json(investment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createInvestment,
  getInvestment,
  getInvestments,
  deleteInvestment,
  updateInvestment,
};
