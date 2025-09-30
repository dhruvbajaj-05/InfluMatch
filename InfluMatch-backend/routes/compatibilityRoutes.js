const express = require("express");
const router = express.Router();
const { checkCompatibility } = require("../controllers/compatibilityController");

router.get("/:brandId", checkCompatibility);

module.exports = router;
