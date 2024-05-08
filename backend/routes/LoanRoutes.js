const express = require("express");
const router = express.Router();
const {
  createLoan,
  getCustomerLoans,
  getLoans,
  deleteLoan,
  updateLoan,
} = require("../controllers/loanController.js");

router.get("/", getLoans);

router.get("/:id", getCustomerLoans);
router.post("/:id", createLoan);
router.delete("/:id", deleteLoan);

router.patch("/:id", updateLoan);

module.exports = router;
