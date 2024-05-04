const express = require("express");
const router = express.Router();
const {
    getChecks,
    createCheck,
    deleteCheck,
    updateCheck
} = require("../controllers/checksController");

router.get("/:id", getChecks);

router.post("/:id", createCheck);

router.delete("/:id", deleteCheck);

router.patch("/:id", updateCheck);

module.exports = router;
