const express = require("express");
const router = express.Router();
const {allListings, show} = require("../controllers/index.controllers.js");

router.get("/", allListings);
router.get('/:id', show)

module.exports = router;
