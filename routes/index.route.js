const express = require("express");
const router = express.Router();
const {
  allListings,
  show,
  addList,
  edit,
  update,
  deleted,
  addReviews,
  deleteReviews,
} = require("../controllers/index.controllers.js");
const validateListing = require("../Middlewares/validateListing.js");
const validateReview = require("../Middlewares/validateReview.js");

router.get("/", allListings);
router.post("/", addList, validateListing);
router.get("/new", (req, res) => {
  res.render("new");
});
router.get("/:id", show);
router.get("/:id/edit", edit);
router.put("/:id", update, validateListing);
router.delete("/:id", deleted);
router.post("/:id/reviews", addReviews, validateReview);
router.post("/:id/reviews", addReviews, validateReview);
router.delete("/:id/reviews/:reviewId", deleteReviews);

module.exports = router;
