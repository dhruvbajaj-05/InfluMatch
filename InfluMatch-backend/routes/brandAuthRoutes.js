const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/brandAuthController");

// ✅ Correct way
router.post("/signup", signup);

module.exports = router;
