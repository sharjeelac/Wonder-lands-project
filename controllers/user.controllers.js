const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.signUp = wrapAsync(async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    let registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Successfully Registerd');
      res.redirect('/listings');
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/signup');
  }
});


module.exports.login = wrapAsync(async (req, res) => {
  try {
    req.flash('success', 'Welcome back to wonder lands');
    const redirectUri = res.locals.redirectUrl || '/listings'
    res.redirect(redirectUri);
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/signup');
  }
});
