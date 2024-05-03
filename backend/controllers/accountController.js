const Account = require("../models/Accounts");
const mongoose = require("mongoose");
//get all workouts
const getAccounts = async (req, res) => {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//create  new workout
const createAccount = async (req, res) => {
  const { type, balance,  } = req.body;

  let emptyFields = []
  if (!title){
    emptyFields.push('title')
  }
  if (!load){
    emptyFields.push('load')
  }
  if (!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length>0){
    return res.status(400).json({error:'Please fill in all the fields',emptyFields})
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete  a specific workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout with that id" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ err: "No workout with that id" });
  }
  res.status(200).json(workout);
};
//update  an existing workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No workout with that id" });
    }
    const workout = await Workout.findOneAndUpdate({ _id: id },{
      ...req.body
    });
    if (!workout) {
      return res.status(404).json({ err: "No workout with that id" });
    }
    res.status(200).json(workout);
  };

module.exports = {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount
};
