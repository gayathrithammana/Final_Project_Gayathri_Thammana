const mongoose = require('mongoose');

const Adventure = mongoose.Schema({
    adventureType: String,
    title: String,
    age: String,
    desc: String,
    price: String,
    Availability: String 
   

});

module.exports = mongoose.model('Adventure', Adventure);