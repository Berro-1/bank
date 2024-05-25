const express = require("express");
const router = express.Router();
const {
  createSavingsAccount,
  createCheckingAccount,
  createLoanAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount,
  getAccountById
} = require("../controllers/accountController");

router.get("/", getAccounts);
router.get("/:id",getUserAccounts);
router.get("/singleAccount/:accountId",getAccountById);

router.post("/loan/:id", createLoanAccount);
router.post("/checking/:id", createCheckingAccount);
router.post("/savings/:id", createSavingsAccount);

router.delete("/:id", deleteAccount);

router.patch("/:id", updateAccount);

module.exports = router;
