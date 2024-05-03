const express = require("express");
const router = express.Router();
const {
  getCreditCards,
  createCreditCard,
  deleteCreditCard,
  updateCreditCard,
} = require("../controllers/creditCardController");

router.get("/:id", getCreditCards);

router.post("/:id", createCreditCard);

router.delete("/:id", deleteCreditCard);

router.patch("/:id", updateCreditCard);

module.exports = router;
