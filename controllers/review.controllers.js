const listingModel = require("../models/listing.js");
const reviewModel = require("../models/review.model.js");
const wrapAsync = require("../utils/wrapAsync.js");
const customError = require("../utils/CustomError.js");

module.exports.addReviews = wrapAsync(async (req, res) => {
  let listing = await listingModel.findById(req.params.id);
  let newReview = new reviewModel(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "Review Submited");
  res.redirect(`/listings/${listing._id}`);
});

// delete review
module.exports.deleteReviews = wrapAsync(async (req, res, next) => {
  let { id, reviewId } = req.params;

  // Find the listing
  let listing = await listingModel.findById(id);
  if (!listing) {
    return next(new customError(404, "Listing not found!"));
  }

  // Remove review reference from listing
  await listingModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the actual review
  await reviewModel.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
});
