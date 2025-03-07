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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/').get(allListings).post(isLoggedIn, validateListing, addList);

router.get('/new', isLoggedIn, (req, res) => {
  res.render('new');
});

// router.post(
//   '/',
//   upload.single('listing[image]'),
//   (req, res) => {
//     res.send(req.file)
//   },
// );

router
  .route('/:id')
  .get(show)
  .put(isLoggedIn, isOwner, validateListing, update)
  .delete(isLoggedIn, isOwner, deleted);

router.get('/:id/edit', isLoggedIn, isOwner, edit);

module.exports = router;
