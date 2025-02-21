const listingModel = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const customError = require("../utils/CustomError.js");

module.exports.allListings = wrapAsync(async (req, res) => {
  let listings = await listingModel.find();
  res.render("index.ejs", { listings });
});

module.exports.show = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id);
  res.render("show", { list });
});

module.exports.edit = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id);
  res.render("edit", { list });
});

module.exports.addList = wrapAsync(async (req, res) => {
  if (!req.body.listing) {
    next(new customError(400, "Send Valid data for listing!"));
  }
  let newList = new listingModel(req.body.listing);
  await newList.save();
  res.redirect("/listings");
});

module.exports.update = wrapAsync(async (req, res) => {
  let { id } = req.params;
  if (!req.body.listing) {
    next(new customError(400, "Send Valid data for listing!"));
  }
  let newList = await listingModel.findByIdAndUpdate(id, req.body.listing);
  await newList.save();
  res.redirect(`/listings/${id}`);
});

module.exports.deleted = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await listingModel.findByIdAndDelete(id);
  res.redirect(`/listings`);
});
