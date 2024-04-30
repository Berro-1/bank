const express = require("express");
const Workout = require("../models/WorkoutModel");
const router = express.Router();
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

// get all workouts
router.get("/", getWorkouts);

//get a single workout
router.get("/:id", getWorkout);

// Post a workout
router.post("/", createWorkout);
//delete a workout
router.delete("/:id", deleteWorkout);

//patch a workout
router.patch("/:id", updateWorkout);

module.exports = router;
