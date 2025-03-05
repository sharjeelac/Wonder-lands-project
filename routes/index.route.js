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

router.get('/new', (req, res) => {
  res.render('new');
});
router.get('/', allListings);
router.post('/',isLoggedIn, validateListing, addList);
router.get('/:id', isLoggedIn, show);
router.get('/:id/edit', isLoggedIn, edit);
router.put('/:id', isLoggedIn, validateListing, update);
router.delete('/:id', isLoggedIn, deleted);

module.exports = router;
