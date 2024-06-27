const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getLatestTransactions,
} = require("../controllers/transactionController.js");

router.post("/:accountId", createTransaction);
router.get("/:id", getAllTransactions);
router.get("/latest/:accountId", getLatestTransactions);

module.exports = router;
