const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const { signUp, login } = require('../controllers/user.controllers.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('usersignup.ejs');
});
router.get('/login', (req, res) => {
  res.render('userlogin.ejs');
});

router.post('/signup', signUp);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  login,
);

module.exports = router;
