const listingModel = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const customError = require("../utils/CustomError.js");
const listingSchema = require("../schemas/listingJoi.js");

// show all listings
module.exports.allListings = wrapAsync(async (req, res) => {
  let listings = await listingModel.find();
  res.render("index.ejs", { listings });
});

// show each list page
module.exports.show = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id).populate("reviews");
  res.render("show", { list });
});

// edit page
module.exports.edit = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id);
  res.render("edit", { list });
});

// post create new list
module.exports.addList = wrapAsync(async (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing || req.body);
  // if (error) {
  //   return next(
  //     new customError(400, error.details.map((el) => el.message).join(","))
  //   );
  // }

  let newList = new listingModel(req.body.listing);
  await newList.save();
  req.flash("success", "New list Successfully Added!");
  res.redirect("/listings");
});

// update
module.exports.update = wrapAsync(async (req, res, next) => {
  let { id } = req.params;

  // const { error } = listingSchema.validate(req.body.listing);
  // if (error) {
  //   return next(
  //     new customError(400, error.details.map((el) => el.message).join(","))
  //   );
  // }
  let newList = await listingModel.findByIdAndUpdate(id, req.body.listing);
  await newList.save();
  res.redirect(`/listings/${id}`);
});

// delete list
module.exports.deleted = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await listingModel.findByIdAndDelete(id);
  res.redirect(`/listings`);
});
