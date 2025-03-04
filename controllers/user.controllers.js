const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.signUp = wrapAsync(async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    let registerUser = await User.register(newUser, password);
    req.flash('success', 'Successfully Registerd');
    res.redirect('/listings');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/signup');
  }
});
