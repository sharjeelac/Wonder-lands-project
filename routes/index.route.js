const express = require('express');
const router = express.Router();
const {
  allListings,
  show,
  addList,
  edit,
  update,
  deleted,
} = require('../controllers/index.controllers.js');
const validateListing = require('../Middlewares/validateListing.js');
const { isLoggedIn } = require('../Middlewares/isLoggedIn.js');
const { isOwner } = require('../Middlewares/isOwner.js');

router.get('/new', isLoggedIn, (req, res) => {
  res.render('new');
});
router.get('/', allListings);
router.post('/', isLoggedIn, isOwner, validateListing, addList);
router.get('/:id', isLoggedIn, show);
router.get('/:id/edit', isLoggedIn, isOwner, edit);
router.put('/:id', isLoggedIn, isOwner, validateListing, update);
router.delete('/:id', isLoggedIn, isOwner, deleted);

module.exports = router;
