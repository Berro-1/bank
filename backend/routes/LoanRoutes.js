const express = require("express");
const router = express.Router();
const {
  createLoan,
  getCustomerLoans,
  getLoans,
  updateLoanStatus,
  createLoanPayment,
  deleteLoan
} = require("../controllers/loanController.js");

router.get("/", getLoans);
router.post("/pay/:loanId", createLoanPayment);

router.get("/:id", getCustomerLoans);
router.post("/:userId", createLoan);

router.patch("/:id", updateLoanStatus);
router.delete("/:id", deleteLoan);

module.exports = router;
