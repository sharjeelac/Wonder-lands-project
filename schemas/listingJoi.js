const joi = require("joi");

const listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      image: joi.string(),
      location: joi.string().required(),
      country: joi.string().required(),
    })
    .required(),
});


module.exports = { listingSchema };
