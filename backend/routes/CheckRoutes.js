const express = require("express");
const router = express.Router();
const {
    getChecks,
    createCheck,
    deleteCheck,
    updateCheck
} = require("../controllers/checksController");

router.get("/:accountId", getChecks);

router.post("/:accountId", createCheck);

router.delete("/:checkId", deleteCheck);

router.patch("/:checkId", updateCheck);

module.exports = router;