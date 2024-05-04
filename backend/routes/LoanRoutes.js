const express = require("express");
const router = express.Router();
const {
  createLoan,
  getLoan,
  getLoans,
  deleteLoan,
  updateLoan,
} = require("../controllers/loanController.js");

router.get("/", getLoans);

router.get("/:id", getLoan);
router.post("/id", createLoan);
router.delete("/:id", deleteLoan);

router.patch("/:id", updateLoan);

module.exports = router;
