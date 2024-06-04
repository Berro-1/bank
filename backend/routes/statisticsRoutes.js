const express = require("express");
const router = express.Router();
const {
getUserTransactionsCount
} = require("../controllers/statisticsController.js");

router.get("/:userId", getUserTransactionsCount);



module.exports = router;
