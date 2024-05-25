const express = require("express");
const router = express.Router();
const {
  createLoan,
  getCustomerLoans,
  getLoans,
  updateLoanStatus,
  createLoanPayment
} = require("../controllers/loanController.js");

router.get("/", getLoans);
router.post("/pay/:id", createLoanPayment);

router.get("/:id", getCustomerLoans);
router.post("/:id", createLoan);

router.patch("/:id", updateLoanStatus);

module.exports = router;
