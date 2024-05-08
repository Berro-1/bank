const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qrController");

router.get("/generate-qr/:accountID", qrController.generateQrCode);

module.exports = router;
