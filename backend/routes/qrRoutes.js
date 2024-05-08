const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/account-by-qr", accountController.getAccountByQr);

module.exports = router;
