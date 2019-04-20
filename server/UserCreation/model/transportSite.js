const mongoose = require('mongoose');

const TransportSite = mongoose.Schema({
    transportType: String,
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

module.exports = mongoose.model('TransportSite', TransportSite);