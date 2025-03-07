const reviewModel = require('../models/review.model.js');

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await reviewModel.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash('error', "you dont't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
