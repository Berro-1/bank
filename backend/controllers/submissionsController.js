const Submission = require("../models/Submission");
const mongoose = require("mongoose");

const CreditCards = require("../models/CreditCards");
const Users = require("../models/User");
const Loans = require("../models/Loans");

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

const updateSubmission = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No submission with that id" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const submission = await Submission.findById(id).session(session);

      if (!submission) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({ error: "No submission found with that id" });
      }

      submission.status = status;
      await submission.save({ session });
      
      if (status === "Approved") {
          try {
              switch (submission.requestType) {
                  case "credit-card":
                      const creditCard = await createCreditCard(submission.user, submission.details.cardName, submission.details.expiryDate);
                      console.log("Credit card created:", creditCard);
                      break;
                  case "new-account":
                      if (submission.details.accountType === "Loan") {
                        console.log(submission.details);
                          await createLoanAccount(submission.user, submission.details, session);
                      } else {
                          await createAccount(submission.user, submission.details, session);
                      }
                      break;
                  default:
                      throw new Error("Invalid request type");
              }
          } catch (error) {
              throw new Error(`Failed to process approved submission: ${error.message}`);
          }
      }

      await session.commitTransaction();
      session.endSession();
      res.status(200).json(submission);
  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Transaction failed:", error);
      res.status(500).json({ error: "Transaction failed: " + error.message });
  }
};






const generateUniqueCardNumber = async () => {
  const generateRandomNumber = () => {
      return Math.floor(1000000000000000 + Math.random() * 9000000000000000); // Generate a 16-digit number
  };

  let cardNumber;
  let isUnique = false;

  while (!isUnique) {
      cardNumber = generateRandomNumber();
      const existingCard = await CreditCards.findOne({ card_number: cardNumber });
      if (!existingCard) {
          isUnique = true;
      }
  }

  return cardNumber;
};

const createCreditCard = async (userId, card_name, expiry) => {

 if (expiry <= new Date()) {
      return { error: "Expiry date must be in the future." };
  }
  let credit_limit;
  let available_credit;
  switch (card_name) {
      case "Platinum Card":
          credit_limit = 20000;
          available_credit = 20000;
          break;
      case "Gold Card":
          credit_limit = 10000;
          available_credit = 10000;
          break;
      case "Silver Card":
          credit_limit = 5000;
          available_credit = 5000;
          break;
      default:
          throw new Error("Invalid card name.");
  }

  const existingCard = await CreditCards.findOne({ user: userId, card_name });
  if (existingCard) {
      throw new Error(`User already has a ${card_name}.`);
  }

  const card_number = await generateUniqueCardNumber();

  return await CreditCards.create({
      card_number,
      user: userId,
      card_name,
      expiry_date: expiry,
      credit_limit,
      available_credit,
  });
};


// Create a new loan account, checking eligibility
const createLoanAccount = async (userId, loanDetails, session) => {
  if (!userId || !loanDetails.loanType || !loanDetails.amount || !loanDetails.loanTerm) {
      throw new Error("All loan fields are required.");
  }

  const userDoc = await Users.findById(userId).session(session);
  if (!userDoc) {
    throw new Error("User not found.");
  }
  
  if (!userDoc.is_eligible_for_loan) {
    throw new Error("User is not eligible for a loan.");
  }

  const interest_rate = (loanDetails.loanTerm / 12) * 4; // Example calculation for interest rate

  const newLoan = new Loans({
    user: userId,
    type: loanDetails.loanType,
    amount: loanDetails.amount,
    interest_rate,
    loan_term: loanDetails.loanTerm,
    status: "Active",
  });

  await newLoan.save({ session });

  // Update user eligibility
  userDoc.is_eligible_for_loan = false;
  await userDoc.save({ session });
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
