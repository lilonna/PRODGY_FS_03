const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // reference to user
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      quantity: { type: Number, default: 1 } // to store how many times a product is added
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;




  