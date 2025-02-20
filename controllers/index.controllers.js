const listingModel = require("../models/listing.js");

module.exports.allListings = async (req, res) => {
  let listings = await listingModel.find();
  res.render("index.ejs", { listings });
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id);
  res.render("show", { list });
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  let list = await listingModel.findById(id);
  res.render("edit", { list });
};

module.exports.addList = async (req, res) => {
  let newList = new listingModel(req.body.listing);
  await newList.save();
  res.redirect("/listings");
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let newList = await listingModel.findByIdAndUpdate(id, req.body.listing);
  await newList.save();
  res.redirect(`/listings/${id}`);
};

module.exports.deleted = async (req, res) => {
  let { id } = req.params;
  await listingModel.findByIdAndDelete(id);
  res.redirect(`/listings`);
};
