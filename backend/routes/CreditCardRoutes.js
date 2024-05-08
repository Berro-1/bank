const express = require("express");
const router = express.Router();
const {
  getCreditCards,
  createCreditCard,
  deleteCreditCard,
  updateCreditCard,
} = require("../controllers/creditCardController");

router.get("/:customerId", getCreditCards);

router.post("/:customerId", createCreditCard);

router.delete("/:cardId", deleteCreditCard);

router.patch("/:cardId", updateCreditCard);

module.exports = router;
