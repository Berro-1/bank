const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount
} = require("../controllers/accountController");

// get all workouts
router.get("/", getAccounts);

// Post a workout
router.post("/", createAccount);
//delete a workout
router.delete("/:id", deleteAccount);

//patch a workout
router.patch("/:id", updateAccount);

module.exports = router;
