const CreditCard = require("../models/CreditCards");
const mongoose = require("mongoose");

const getCreditCards = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Validate the userId format if necessary
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Fetch credit cards that are linked to the userId
    const creditCards = await CreditCard.find({ user: userId });

    // If no credit cards found, return an appropriate message
    if (!creditCards.length) {
      return res
        .status(404)
        .json({ message: "No credit cards found for this user" });
    }

    res.status(200).json(creditCards);
  } catch (error) {
    console.error("Error fetching credit cards:", error);
    res.status(500).json({ error: "Failed to fetch credit cards" });
  }
};


const createCreditCard = async (req, res) => {
  const { card_name, expiry_date, credit_limit, available_credit } = req.body;
  const customerId = req.params.customerId;
  // Validate expiry date
  const expiry = new Date(expiry_date);
  if (expiry <= new Date()) {
    return res
      .status(400)
      .json({ error: "Expiry date must be in the future." });
  }

  // Validate credit limits
  if (
    credit_limit < 0 ||
    available_credit < 0 ||
    available_credit > credit_limit
  ) {
    return res
      .status(400)
      .json({ error: "Invalid credit limit or available credit." });
  }

  try {
    const newCreditCard = await CreditCard.create({
      card_name,
      customer: customerId,
      expiry_date: expiry,
      credit_limit,
      available_credit,
    });
    res.status(201).json(newCreditCard);
  } catch (error) {
    console.error("Failed to create credit card:", error);
    res
      .status(500)
      .json({ error: "Failed to create credit card: " + error.message });
  }
};
const deleteCreditCard = async (req, res) => {
  try {
    const deletedCreditCard = await CreditCard.findByIdAndDelete(req.params.id);
    if (!deletedCreditCard) {
      return res.status(404).json({ error: "Credit card not found" });
    }
    res.status(200).json({ message: "Credit card deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to delete credit card: " + error.message });
  }
};
const updateCreditCard = async (req, res) => {
  try {
    const updatedCreditCard = await CreditCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCreditCard) {
      return res.status(404).json({ error: "Credit card not found" });
    }
    res.status(200).json(updatedCreditCard);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update credit card: " + error.message });
  }
};
module.exports = {
  getCreditCards,
  createCreditCard,
  deleteCreditCard,
  updateCreditCard,
};
