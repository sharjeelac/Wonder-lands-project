const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const { signUp, login } = require('../controllers/user.controllers.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { savedRedirectUrl } = require('../Middlewares/isLoggedIn.js');

router
  .route('/signup')
  .get((req, res) => {
    res.render('usersignup.ejs');
  })
  .post(savedRedirectUrl, signUp);

router
  .route('/login')
  .get((req, res) => {
    res.render('userlogin.ejs');
  })
  .post(
    savedRedirectUrl,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
    }),
    login,
  );

// logout get
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'you are logged out!');
    res.redirect('/listings');
  });
});

module.exports = router;
