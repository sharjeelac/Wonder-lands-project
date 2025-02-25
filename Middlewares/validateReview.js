const {reviewSchema} = require("../schemas/reviewJoiSchema.js");
const customError = require("../utils/CustomError.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    next(new customError(400, error));
  } else {
    next();
  }
};

module.exports = validateReview

