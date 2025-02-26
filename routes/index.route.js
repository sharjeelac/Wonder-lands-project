const express = require("express");
const router = express.Router();
const {
  allListings,
  show,
  addList,
  edit,
  update,
  deleted,
} = require("../controllers/index.controllers.js");
const validateListing = require("../Middlewares/validateListing.js");

router.get("/new", (req, res) => {
  res.render("new");
});
router.get("/", allListings);
router.post("/", validateListing, addList);
router.get("/:id", show);
router.get("/:id/edit", edit);
router.put("/:id", validateListing, update);
router.delete("/:id", deleted);

module.exports = router;
