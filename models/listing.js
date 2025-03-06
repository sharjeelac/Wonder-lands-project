const mongoose = require('mongoose');
const { Schema } = mongoose;
const reviewModel = require('../models/review.model.js');
const { link } = require('joi');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  image: {
    type: String,
    default: 'link',
    set: (v) => (v === '' ? 'link' : v),
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

listingSchema.post('findOneAndDelete', async (list) => {
  if (list) {
    await reviewModel.deleteMany({ _id: { $in: list.reviews } });
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
