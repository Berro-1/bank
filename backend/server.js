require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const accountsRouter = require("./routes/AccountRoutes");
const checksRouter = require("./routes/CheckRoutes");
const customersRouter = require("./routes/CustomerRoutes");
const creditCardRouter = require("./routes/CreditCardRoutes");
const investmentRouter =require("./routes/InvestmentRoutes")
const loanRouter = require("./routes/LoanRoutes");
const transactionRouter = require("./routes/TransactionRoutes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/accounts", accountsRouter);
app.use("/api/checks", checksRouter);
app.use("/api/customers", customersRouter);
app.use("/api/creditCards", creditCardRouter);
app.use("/api/investment", investmentRouter);
app.use("/api/loan", loanRouter);
app.use("/api/transaction", transactionRouter);





mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(" connected to MongoDB & listening on port 4000");
    });
  
  })
  .catch((err) => {
    console.error(err);
  });
 