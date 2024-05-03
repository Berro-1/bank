const CreditCard = require("../models/CreditCards");
const mongoose = require("mongoose");

exports.getCreditCards = async (req, res) => {
  try {
    const creditCard = await CreditCard.findById(req.params.id);
    if (!creditCard) {
      return res.status(404).json({ message: "Credit card not found" });
    }
    res.json(creditCard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching credit card" });
  }
};
