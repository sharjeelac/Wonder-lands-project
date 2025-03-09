const listingModel = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const customError = require('../utils/CustomError.js');
const listingSchema = require('../schemas/listingJoi.js');

// show all listings
module.exports.allListings = wrapAsync(async (req, res) => {
  let listings = await listingModel.find();
  res.render('index.ejs', { listings });
});

// show each list page
module.exports.show = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let list = await listingModel
    .findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('owner');
  if (!list) {
    req.flash('error', 'List does not Exit');
    res.redirect('/listings');
  }
  res.render('show', { list });
});

// edit page
module.exports.edit = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id);
  let originalUrl = list.image.url;
  originalUrl.replace('/upload', '/upload/h_300,w_256');
  res.render('edit', { list, originalUrl });
});

// post create new list
module.exports.addList = wrapAsync(async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const { error } = listingSchema.validate(req.body.listing || req.body);
  let newList = new listingModel(req.body.listing);
  newList.owner = req.user._id;
  newList.image = { url, filename };
  await newList.save();
  req.flash('success', 'New list Successfully Added!');
  res.redirect('/listings');
});

// update
module.exports.update = wrapAsync(async (req, res, next) => {
  let { id } = req.params;
  let listing = await listingModel.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  if (typeof req.file !== 'undefined') {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash('success', 'List Updated');
  res.redirect(`/listings/${id}`);
});

// delete list
module.exports.deleted = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await listingModel.findByIdAndDelete(id);
  req.flash('success', 'listing Delete');
  res.redirect(`/listings`);
});
