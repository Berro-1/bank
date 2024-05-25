const express = require("express");
const submissionController = require("../controllers/submissionsController");
const router = express.Router();

router.post("/credit-card/:userId", submissionController.createCreditCardSubmission);
router.post("/new-account/:userId",submissionController.createNewAccountSubmission);

router.get("/", submissionController.getSubmissions);
router.get("/:id", submissionController.getSubmissionById);
router.get(
  "/user-submissions/:userId",
  submissionController.getUserSubmissions
);
router.patch("/:id", submissionController.updateSubmission);
router.delete("/:id", submissionController.deleteSubmission);

module.exports = router;
