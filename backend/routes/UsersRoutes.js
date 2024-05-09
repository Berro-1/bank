const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

// get all workouts
router.get("/", getUsers);

router.get("/:id",getUser);
// Post a workout
router.post("/", createUser);
//delete a workout
router.delete("/:id", deleteUser);

//patch a workout
router.patch("/:id", updateUser);

module.exports = router;
