const Submission = require("../models/Submission");
const mongoose = require("mongoose");

const createCreditCardSubmission = async (req, res) => {
  const { userId } = req.params;
  const { details } = req.body;

  if (!userId || !details || !details.cardName) {
      return res.status(400).json({ message: "Missing user ID, card name or details" });
  }

  // Validate the card name
  const validCardNames = ["Silver Card", "Gold Card", "Platinum Card"];
  if (!validCardNames.includes(details.cardName)) {
      return res.status(400).json({ message: "Invalid card name" });
  }

  try {
      // Check if the user already has a submission for this type of card
      const existingSubmission = await Submission.findOne({ 
          user: userId, 
          'details.cardName': details.cardName 
      });

      if (existingSubmission) {
          return res.status(400).json({ message: `You already have a submission for a ${details.cardName}` });
      }

      const submission = new Submission({
          user: userId,
          requestType: 'credit-card',
          details: details,
          status: 'Pending'
      });

      await submission.save();
      res.status(201).json(submission);
  } catch (error) {
      console.error("Error while processing the request:", error);
      res.status(500).json({ message: "Server error: " + error.message, errorDetails: error });
  }
};


const createNewAccountSubmission = async (req, res) => {
const userId = req.params.userId; 
const details = req.body.details;  

if (!userId || !details ) {
  return res.status(400).json({ message: "Missing required account details" });
}
if(details.accountType === 'Loan'){
  if(!details.loanType || !details.loanTerm){
    return res.status(400).json({ message: "Missing required loan details" });
  }
}
try {
  // Check if the user already has a new account submission
  const existingSubmission = await Submission.findOne({ user: userId, requestType: 'New Account', 'details.accountType': details.accountType });
  if (existingSubmission) {
      return res.status(400).json({ message: `User already has a ${details.accountType} submission` });
  }

  const newSubmission = new Submission({
    user: userId,
    requestType: 'new-account',
    details: details,
    status: 'Pending'
  });

  await newSubmission.save();

  res.status(201).json(newSubmission);

} catch (err) {
  console.error("Error while processing the new account submission:", err);
  res.status(500).json({ message: "Server error: " + err.message });
}
};


// Get all submissions
const getSubmissions = async (req, res) => {
  const reqType =req.params.reqType;
  try {
    const submissions = await Submission.find({requestType: reqType}).populate('user', 'name')
      .sort({ createdAt: -1 })
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
    const submissions = await Submission.find({ user: userId }).sort({ createdAt: -1 }).populate('user', 'name');
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a submission
const updateSubmission = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No submission with that id" });
  }

  try {
    const submission = await Submission.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({ error: "No submission with that id" });
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Delete a submission
const deleteSubmission = async (req, res) => {
  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No submission with that id" });
  // }
  // const submission = await Submission.findOneAndDelete({ _id: id });
  const result = await Submission.deleteMany();
  // if (!submission) {
  //   return res.status(404).json({ error: "No submission with that id" });
  // }
  res.status(200).json(result);
};

module.exports = {
  createCreditCardSubmission,
  createNewAccountSubmission,
  getSubmissions,
  getSubmissionById,
  getUserSubmissions,
  updateSubmission,
  deleteSubmission,
};
