require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const accountsRouter = require("./routes/AccountRoutes");
const checksRouter = require("./routes/CheckRoutes");
const customersRouter = require("./routes/CustomerRoutes");
const creditCardRouter = require("./routes/CreditCardRoutes");
const investmentRouter = require("./routes/InvestmentRoutes");
const loanRouter = require("./routes/LoanRoutes");
const transactionRouter = require("./routes/TransactionRoutes");
const qrRoutes = require("./routes/qrRoutes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/accounts", accountsRouter);
app.use("/api/checks", checksRouter);
app.use("/api/customers", customersRouter);
app.use("/api/creditCard", creditCardRouter);
app.use("/api/investment", investmentRouter);
app.use("/api/loan", loanRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api", qrRoutes);

const PORT = process.env.PORT || 4001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to MongoDB & listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
