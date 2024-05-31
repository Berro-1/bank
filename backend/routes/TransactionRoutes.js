const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getLatestTransactions,
  fetchDetails
} = require("../controllers/transactionController.js");

router.post("/:accountId", createTransaction);
router.get("/:accountId", getAllTransactions);
router.get("/latest/:accountId", getLatestTransactions);




module.exports = router;
