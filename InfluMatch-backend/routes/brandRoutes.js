const express = require("express");
const router = express.Router();
const {createBrand} = require("../controllers/brandController");

router.post("/", createBrand);

module.exports = router;

