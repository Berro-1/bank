const QRCode = require("qrcode");

const generateQrCode = async (req, res) => {
  try {
    const accountID = req.params.accountID;
    const url = `https://yourbank.com/api/findacc?accountID=${accountID}`;

    const qrCodeUrl = await QRCode.toDataURL(url);
    res.json({ qrCodeUrl });
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
};

module.exports = { generateQrCode };
