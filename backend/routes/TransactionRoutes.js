const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,

} = require("../controllers/transactionController.js");

router.post("/:accountId", createTransaction);
router.get("/:accountId", getAllTransactions);


module.exports = router;
