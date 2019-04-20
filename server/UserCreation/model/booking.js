const mongoose = require('mongoose');


const Bookings = mongoose.Schema({
    AdvType:String,
    Date: String,
     Time: String,
     Available: String,
     price: String,
     
});
module.exports = mongoose.model('Bookings', Bookings);