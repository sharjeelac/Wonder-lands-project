const { number, date } = require("joi");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: [
    {
      type: number,
      min: 1,
      max: 5,
    },
  ],
  createdAt: {
    type: date,
    default: Date.now(),
  },
});

const reviewModel = mongoose.model('Review', reviewSchema)

module.exports = reviewModel
