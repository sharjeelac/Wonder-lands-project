const express = require("express");
const router = express.Router();
const { allListings, show, addList, edit , update, deleted} = require("../controllers/index.controllers.js");

router.get("/", allListings);
router.post('/', addList)
router.get("/new", (req, res) => {
  res.render("new");
});
router.get("/:id", show);
router.get("/:id/edit", edit);
router.put('/:id', update)
router.delete('/:id', deleted)

module.exports = router;
