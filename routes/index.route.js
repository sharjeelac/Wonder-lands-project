const express = require("express");
const router = express.Router();
const {allListings} = require("../controllers/index.controllers.js");

router.get("/", allListings);

module.exports = router;
