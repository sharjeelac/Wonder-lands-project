const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const { signUp } = require('../controllers/user.controllers.js');
const wrapAsync = require('../utils/wrapAsync.js');

router.get('/signup', (req, res) => {
  res.render('usersignup.ejs');
});

router.post('/signup', signUp);

module.exports = router;
