const express = require("express");
const submissionController = require("../controllers/submissionsController");
const router = express.Router();

router.post("/user-submissions/:userId", submissionController.createSubmission);
router.get("/", submissionController.getSubmissions);
router.get("/:id", submissionController.getSubmissionById);
router.get("/user-submissions/:userId",submissionController.getUserSubmissions);
router.put("/:id", submissionController.updateSubmission);
router.delete("/:id", submissionController.deleteSubmission);

module.exports = router;
