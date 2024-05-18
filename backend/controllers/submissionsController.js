const Submission = require("../models/Submission");
const mongoose = require("mongoose");

// Create a new submission
const createSubmission = async (req, res) => {
  const { user, requestType, details } = req.body;

  if (!user || !requestType || !details) {
    return res.status(400).json({
      error: "All fields are required: user, requestType, details.",
    });
  }

  const validRequestTypes = [
    "Credit Card",
    "Loan",
    "New Account",
    "New Checkbook",
  ];

  if (!validRequestTypes.includes(requestType)) {
    return res.status(400).json({
      error: "Invalid request type provided.",
    });
  }

  try {
    const submission = await Submission.create({ user, requestType, details });
    res.status(201).json(submission);
  } catch (err) {
    console.error("Failed to create submission:", err);
    res.status(500).json({
      error: "Server error: " + err.message,
    });
  }
};

// Get all submissions
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({})
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific submission by ID
const getSubmissionById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No submission with that id" });
  }
  const submission = await Submission.findById(id).populate("user");
  if (!submission) {
    return res.status(404).json({ error: "No submission with that id" });
  }
  res.status(200).json(submission);
};

// Get submissions by user ID
const getUserSubmissions = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }
  try {
    const submissions = await Submission.find({ user: userId }).populate(
      "user"
    );
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a submission
const updateSubmission = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No submission with that id" });
  }
  const submission = await Submission.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!submission) {
    return res.status(404).json({ error: "No submission with that id" });
  }
  res.status(200).json(submission);
};

// Delete a submission
const deleteSubmission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No submission with that id" });
  }
  const submission = await Submission.findOneAndDelete({ _id: id });
  if (!submission) {
    return res.status(404).json({ error: "No submission with that id" });
  }
  res.status(200).json(submission);
};

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  getUserSubmissions,
  updateSubmission,
  deleteSubmission,
};
