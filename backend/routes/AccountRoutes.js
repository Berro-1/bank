const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount
} = require("../controllers/accountController");

// get all workouts
router.get("/", getAccounts);
router.get("/:id",getUserAccounts);
// Post a workout
router.post("/:id", createAccount);
//delete a workout
router.delete("/:id", deleteAccount);

//patch a workout
router.patch("/:id", updateAccount);

module.exports = router;
