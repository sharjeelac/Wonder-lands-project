const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  addReviews,
  deleteReviews,
} = require('../controllers/review.controllers.js');
const validateReview = require('../Middlewares/validateReview.js');
const { isLoggedIn } = require('../Middlewares/isLoggedIn.js');
const { isReviewAuthor } = require('../Middlewares/isAuthor.js');

router.post('/', isLoggedIn, validateReview, addReviews);
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, deleteReviews);

module.exports = router;
