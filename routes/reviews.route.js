const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addReviews,
  deleteReviews,
} = require("../controllers/review.controllers.js");
const validateReview = require("../Middlewares/validateReview.js");

router.post("/", validateReview, addReviews);
router.delete("/:reviewId", deleteReviews);

module.exports = router;
