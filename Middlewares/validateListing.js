const listingSchema = require("../schemas/listingJoi.js");
const customError = require("../utils/CustomError.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    next(new customError(400, error));
  } else {
    next();
  }
};

module.exports = validateListing

