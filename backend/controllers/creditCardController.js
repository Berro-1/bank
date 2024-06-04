const mongoose = require("mongoose");
const CreditCard = require("../models/CreditCards");

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

const generateUniqueCardNumber = async () => {
  const generateRandomNumber = () => {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000); // Generate a 16-digit number
  };

  let cardNumber;
  let isUnique = false;

  while (!isUnique) {
    cardNumber = generateRandomNumber();
    const existingCard = await CreditCard.findOne({ card_number: cardNumber });
    if (!existingCard) {
      isUnique = true;
    }
  }

  return cardNumber;
};

const createCreditCard = async (req, res) => {
  const { card_name, expiry_date } = req.body;
  const userId = req.params.userId;

  // Validate expiry date
  const expiry = new Date(expiry_date);
  if (expiry <= new Date()) {
    return res
      .status(400)
      .json({ error: "Expiry date must be in the future." });
  }

  // Set credit limits based on card name
  let credit_limit;
  let available_credit;

  switch (card_name) {
    case "Platinum Card":
      credit_limit = 20000;
      available_credit = 20000;
      break;
    case "Gold Card":
      credit_limit = 10000;
      available_credit = 10000;
      break;
    case "Silver Card":
      credit_limit = 5000;
      available_credit = 5000;
      break;
    default:
      return res.status(400).json({ error: "Invalid card name." });
  }

  try {
    // Check if the user already has a card with the same name
    const existingCard = await CreditCard.findOne({ user: userId, card_name });
    if (existingCard) {
      return res
        .status(400)
        .json({ error: `User already has a ${card_name}.` });
    }

    const card_number = await generateUniqueCardNumber();

    const newCreditCard = await CreditCard.create({
      card_number,
      user: userId,
      card_name,
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
