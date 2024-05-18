require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const accountsRouter = require("./routes/AccountRoutes");
const checksRouter = require("./routes/CheckRoutes");
const userRouter = require("./routes/UsersRoutes");
const creditCardRouter = require("./routes/CreditCardRoutes");
const investmentRouter = require("./routes/InvestmentRoutes");
const loanRouter = require("./routes/LoanRoutes");
const transactionRouter = require("./routes/TransactionRoutes");
const qrRoutes = require("./routes/qrRoutes");
const submissionRoutes =require("./routes/SubmissionRoutes")
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use("/api/accounts", accountsRouter);
app.use("/api/checks", checksRouter);
app.use("/api/users", userRouter);
app.use("/api/creditCard", creditCardRouter);
app.use("/api/investment", investmentRouter);
app.use("/api/loan", loanRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api", qrRoutes);
app.use("/api", submissionRoutes);
const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server connected to MongoDB & listening on port ${PORT}`)))
  .catch((err) => console.error(err));
