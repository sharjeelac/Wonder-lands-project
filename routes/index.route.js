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
router.post("/", validateListing, addList);
router.get("/:id", show);
router.get("/:id/edit", edit);
router.put("/:id", validateListing, update);
router.delete("/:id", deleted);
router.post("/:id/reviews", addReviews, validateReview);
router.delete("/:id/reviews/:reviewId", deleteReviews);
router.get("/new", (req, res) => {
  res.render("new");
});

module.exports = router;
