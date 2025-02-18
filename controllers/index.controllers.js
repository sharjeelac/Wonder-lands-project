const listingModel = require('../models/listing.js')

module.exports.allListings =  async (req, res)=>{
    let listings = await listingModel.find()
    res.render('index.ejs', {listings})
}