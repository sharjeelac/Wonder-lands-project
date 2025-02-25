const express = require("express");
const router = express.Router();
const {
  addReviews,
  deleteReviews,
} = require("../controllers/review.controllers.js");
const validateReview = require("../Middlewares/validateReview.js");

router.post("/:id/reviews", addReviews, validateReview);
router.delete("/:id/reviews/:reviewId", deleteReviews);

module.exports = router;
