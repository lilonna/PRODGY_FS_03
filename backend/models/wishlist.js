// models/Wishlist.js
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Assuming you have a 'User' model for user data
    // required: true
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',  // Assuming you have a 'Product' model for product data
    // required: true 
  },
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
module.exports = Wishlist;

