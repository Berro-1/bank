const Loans = require("../models/Loans");
const User = require("../models/User");
const Accounts = require("../models/Accounts");
const Transaction = require("../models/Transactions"); // Ensure you have a Transaction model
const mongoose = require("mongoose");

const getLoans = async (req, res) => {
  try {
    const loans = await Loans.find().populate('user', 'name');
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCustomerLoans = async (req, res) => {
  const { id } = req.params;
  try {
    const loans = await Loans.find({ user: id }).sort({ createdAt: -1 });
    if (!loans || loans.length === 0) {
      return res
        .status(404)
        .json({ error: "No loans found for this customer" });
    }
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLoanPayment = async (req, res) => {
  const { loanId, paymentAmount, accountId } = req.body;

  // Validate input parameters
  if (
    !loanId ||
    !accountId ||
    typeof paymentAmount !== "number" ||
    paymentAmount <= 0
  ) {
    return res.status(400).json({
      error: "Invalid input. Please ensure all fields are correct and the payment amount is positive.",
    });
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the loan by ID
    const loan = await Loans.findById(loanId).session(session);
    if (!loan) {
      throw new Error("Loan not found");
    }

    // Find the account by ID
    const account = await Accounts.findById(accountId).session(session);
    if (!account) {
      throw new Error("Account not found");
    }

    // Check if the account has enough balance
    if (account.balance < paymentAmount) {
      throw new Error("Insufficient funds");
    }

    // Check if the payment amount is greater than the remaining loan amount
    if (paymentAmount > loan.amount) {
      throw new Error("Payment amount exceeds the remaining loan amount");
    }

    // Create a transaction record for the payment
    const paymentTransaction = new Transaction({
      account: accountId,
      second_account: loanId, // Store loan ID
      amount: paymentAmount,
      type: "Loan Payment",
      transfer_type: "Sent",
    });
    await paymentTransaction.save({ session });

    // Deduct the payment amount from the account balance
    account.balance -= paymentAmount;
    await account.save({ session });

    // Update the loan amount
    loan.amount -= paymentAmount;

    // Check if the loan is fully paid
    if (loan.amount <= 0) {
      loan.amount = 0;
      loan.status = "Closed"; // Optionally update the loan status to closed
      await User.findByIdAndUpdate(
        loan.user,
        { is_eligible_for_loan: true },
        { session }
      );
    }

    // Save the updated loan
    await loan.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      message: "Payment successful",
      transaction: paymentTransaction,
      loan,
      account,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: "Server error: " + error.message });
  } finally {
    session.endSession();
  }
};

const createLoan = async (req, res) => {
  const { user, type, amount, interest_rate, loan_term, status } = req.body;

  // Validate required fields
  if (!user || !type || !amount || !interest_rate || !loan_term || !status) {
    return res.status(400).json({
      error:
        "All fields are required: user, type, amount, interest rate, loan term, status.",
    });
  }

  // Validate loan type
  const validTypes = ["Personal", "Mortgage", "Auto", "Education"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid type of loan." });
  }

  // Validate amount
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid amount. Amount must be a positive number." });
  }

  // Validate interest rate
  if (typeof interest_rate !== "number" || interest_rate < 0) {
    return res
      .status(400)
      .json({
        error:
          "Invalid interest rate. Interest rate must be a non-negative number.",
      });
  }

  // Validate loan term
  if (typeof loan_term !== "number" || loan_term <= 0) {
    return res
      .status(400)
      .json({
        error: "Invalid loan term. Loan term must be a positive number.",
      });
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
      status,
    });
    await loan.save();

    res.status(201).json({
      loan,
      message: "Loan created successfully",
    });
  } catch (err) {
    console.error("Failed to create loan:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// DELETE controller to remove a loan by ID
const deleteLoan = async (req, res) => {
  const { id } = req.params; // Extracting loan ID from request parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid loan ID provided." });
  }

  try {
    const loan = await Loans.findByIdAndDelete(id);

    if (!loan) {
      return res.status(404).send({ message: "Loan not found." });
    }

    res.send({ message: "Loan deleted successfully.", loan });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete the loan.", error: error.message });
  }
};

const updateLoanStatus = async (req, res) => {
  const { id } = req.params; // This is the loan ID
  const { status } = req.body;

  const validStatuses = ["Active", "Closed", "In Default"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      error: "Invalid status. Valid statuses are: Active, Closed, In Default.",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the loan by ID
    const loan = await Loans.findById(id).session(session);
    if (!loan) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "No loan found with provided ID." });
    }

    // Find the user associated with the loan
    const user = await User.findById(loan.user).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "No user found for this loan." });
    }

    // Check if the status is being set to "Active" or "In Default"
    if (["Active", "In Default"].includes(status)) {
      // Check if the user has any other active or in default loans
      const otherLoans = await Loans.find({
        user: user._id,
        _id: { $ne: loan._id },
        status: { $in: ["Active", "In Default"] },
      }).session(session);

      if (otherLoans.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error:
            "User has other loans that are Active or In Default. Cannot set this loan to Active or In Default.",
        });
      }
    }

    // If the loan is being closed, ensure the amount is zero
    if (status === "Closed" && loan.amount > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        error: "Cannot close a non-fully paid loan.",
      });
    }

    // Update the loan status
    loan.status = status;
    await loan.save({ session });

    // If the loan is closed, check if the user is eligible for a new loan
    if (status === "Closed") {
      const remainingLoans = await Loans.find({
        user: user._id,
        status: { $in: ["Active", "In Default"] },
      }).session(session);

      if (remainingLoans.length === 0) {
        user.is_eligible_for_loan = true;
      }
    } else {
      user.is_eligible_for_loan = false;
    }

    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      loan: loan,
      message: "Loan status updated successfully.",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  deleteLoan,
  createLoanPayment,
  createLoan,
  getCustomerLoans,
  getLoans,
  updateLoanStatus,
};
