const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  image: {
    type: String,
    default: "link",
    set: (v) => (v === "" ? "link" : v),
  },
  location: String,
  country : String
});

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing