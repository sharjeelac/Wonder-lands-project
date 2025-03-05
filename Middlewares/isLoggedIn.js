module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be login to create list');
    return res.redirect('/login');
  }
  next()
};
