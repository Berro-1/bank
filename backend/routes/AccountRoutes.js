const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount,
  getAccountById
} = require("../controllers/accountController");

// get all accounts
router.get("/", getAccounts);
router.get("/:id",getUserAccounts);
router.get("/singleAccount/:accountId",getAccountById);
// Post a account
router.post("/", createAccount);
//delete a account
router.delete("/:id", deleteAccount);

//patch a account
router.patch("/:id", updateAccount);

module.exports = router;
