const express = require("express");
const submissionController = require("../controllers/submissionsController");
const router = express.Router();

router.post("/submissions", submissionController.createSubmission);
router.get("/submissions", submissionController.getSubmissions);
router.get("/submissions/:id", submissionController.getSubmissionById);
router.get("/user-submissions/:userId",submissionController.getUserSubmissions);
router.put("/submissions/:id", submissionController.updateSubmission);
router.delete("/submissions/:id", submissionController.deleteSubmission);

module.exports = router;
