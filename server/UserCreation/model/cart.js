const mongoose = require('mongoose');

const Cart = mongoose.Schema({
    email: String,
    packageDetails: { 
        title: String,
        date: String,
        time: String,
        price: String
    }

});

module.exports = mongoose.model('Cart', Cart);