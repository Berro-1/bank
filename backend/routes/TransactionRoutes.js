const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController.js");

router.post("/:accountId", createTransaction);

router.get("/:id", getTransaction);
router.delete("/:id", deleteTransaction);
router.patch("/:id", updateTransaction);

module.exports = router;
