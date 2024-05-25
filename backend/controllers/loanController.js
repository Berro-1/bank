const Loans = require("../models/Loans");
const Submission = require("../models/Submission");

const mongoose = require("mongoose");

const getLoans = async (req, res) => {
  try {
    const loans = await Loans.find({});
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCustomerLoans = async (req, res) => {
  const { id } = req.params;
  try {
    const loans = await Loans.find({ user: id });
    if (!loans || loans.length === 0) {
      return res.status(404).json({ error: "No loans found for this customer" });
    }
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const createLoan = async (req, res) => {
  const { user, type, amount, interest_rate, loan_term, status } = req.body;

  // Validate required fields
  if (!user || !type || !amount || !interest_rate || !loan_term || !status) {
    return res.status(400).json({
      error: "All fields are required: user, type, amount, interest rate, loan term, status."
    });
  }

  // Validate loan type
  const validTypes = ["Personal", "Mortgage", "Auto", "Education"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid type of loan." });
  }

  // Validate amount
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount. Amount must be a positive number." });
  }

  // Validate interest rate
  if (typeof interest_rate !== "number" || interest_rate < 0) {
    return res.status(400).json({ error: "Invalid interest rate. Interest rate must be a non-negative number." });
  }

  // Validate loan term
  if (typeof loan_term !== "number" || loan_term <= 0) {
    return res.status(400).json({ error: "Invalid loan term. Loan term must be a positive number." });
  }

  // Validate status
  const validStatuses = ["Active", "Closed", "In Default"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  try {
    // Create the loan
    const loan = new Loans({
      user,
      type,
      amount,
      interest_rate,
      loan_term,
      status
    });
    await loan.save();

    // // Create a submission record
    // const submissionDetails = `Loan created with amount: ${amount} and type: ${type}`;
    // const submission = new Submission({
    //   user, 
    //   requestType: 'Loan',
    //   details: submissionDetails,
    //   status: 'Pending' 
    // });

    // await submission.save();  

    // Return the created loan and submission information
    res.status(201).json({
      loan,
      message: "Loan created successfully"
    });

  } catch (err) {
    console.error("Failed to create loan or submission:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};




const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loans.findByIdAndDelete(id);
    if (!loan) {
      return res.status(404).json({ error: "No loan found" });
    }
    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLoan = async (req, res) => {
  const { id } = req.params; // This is the user ID
  const updates = req.body;

  try {
    // Find and update the loan by user ID
    const loan = await Loans.findOneAndUpdate(
      { user: id },
      updates,
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ error: "No loan found" });
    }

    // Access the user._id from the loan document
    const userId = loan.user._id;

    // Find and update the corresponding submission
    // const submission = await Submission.findOneAndUpdate(
    //   { user: userId, requestType: "Loan" },
    //   { status: updates.status },
    //   { new: true }
    // );

    // if (!submission) {
    //   return res.status(404).json({ error: "No corresponding submission found" });
    // }

    res.status(200).json({ loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createLoan,
  getCustomerLoans,
  getLoans,
  deleteLoan,
  updateLoan,
};
