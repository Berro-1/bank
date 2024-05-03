const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer
} = require("../controllers/customerController");

// get all workouts
router.get("/", getCustomers);

router.get("/:id",getCustomer);
// Post a workout
router.post("/", createCustomer);
//delete a workout
router.delete("/:id", deleteCustomer);

//patch a workout
router.patch("/:id", updateCustomer);

module.exports = router;
