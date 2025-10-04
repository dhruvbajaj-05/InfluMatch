const express = require("express");
const router = express.Router();
const { getCompatibility } = require("../controllers/compatibilityController");

router.get("/:brandId/:influencerId", getCompatibility);

module.exports = router;

