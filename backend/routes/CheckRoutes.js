const express = require("express");
const router = express.Router();
const {
    getChecks,
    createCheck,
    deleteCheck,
    updateCheck
} = require("../controllers/checksController");

// get all workouts
router.get("/:id", getChecks);

// Post a workout
router.post("/:id", createCheck);
//delete a workout
router.delete("/:id", deleteCheck);

//patch a workout
router.patch("/:id", updateCheck);

module.exports = router;
