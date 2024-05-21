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

// get all workouts
router.get("/", getAccounts);
router.get("/:id",getUserAccounts);
router.get("/singleAccount/:accountId",getAccountById);
// Post a workout
router.post("/:id", createAccount);
//delete a workout
router.delete("/:id", deleteAccount);

//patch a workout
router.patch("/:id", updateAccount);

module.exports = router;
