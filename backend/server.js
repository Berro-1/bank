require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const accountsRouter = require("./routes/AccountRoutes");
const userRouter = require("./routes/UsersRoutes");
const creditCardRouter = require("./routes/CreditCardRoutes");
const investmentRouter = require("./routes/InvestmentRoutes");
const loanRouter = require("./routes/LoanRoutes");
const transactionRouter = require("./routes/TransactionRoutes");
const qrRoutes = require("./routes/qrRoutes");
const submissionRoutes =require("./routes/SubmissionRoutes")
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')
const sgMail = require('@sendgrid/mail');
const statisticsRoutes =require("./routes/statisticsRoutes")
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    methods: ['GET', 'POST', 'PUT','PATCH' ,'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use("/api/accounts", accountsRouter);
app.use("/api/users", userRouter);
app.use("/api/creditCard", creditCardRouter);
app.use("/api/investment", investmentRouter);
app.use("/api/loan", loanRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api", qrRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/statistics",statisticsRoutes );


//email
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'hussienberro1@gmail.com',
        from: email,
        subject: `Contact Us Form Submission from ${name}`,
        text: message
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({ success: 'Email sent successfully!' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.toString());
        });
});


const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server connected to MongoDB & listening on port ${PORT}`)))
  .catch((err) => console.error(err));
