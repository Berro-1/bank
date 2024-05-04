const express = require("express");
const router = express.Router();
const {
  createInvestment,
  getInvestment,
  getInvestments,
  deleteInvestment,
  updateInvestment,
} = require("../controllers/investmentController.js");

router.get("/", getInvestments);

router.get("/:id", getInvestment);
router.post("/", createInvestment);
router.delete("/:id", deleteInvestment);

router.patch("/:id", updateInvestment);

module.exports = router;
