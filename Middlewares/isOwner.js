const listingModel = require('../models/listing.js')

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await listingModel.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash('error', "you dont't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next()
};
