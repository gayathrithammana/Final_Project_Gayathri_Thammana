const mongoose = require('mongoose');

const AccomodationSite = mongoose.Schema({
    siteName: String,
    siteDesc: String,
    siteLink: String,
    siteRating: Number,
    rangeFrom: Number,
    email: String,
    phone: String,
    img: { 
        data: Buffer,
        contentType: String 
    }

});

module.exports = mongoose.model('AccomodationSite', AccomodationSite);