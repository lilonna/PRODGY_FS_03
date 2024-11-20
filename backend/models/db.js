require('dotenv').config();
const mongoose = require('mongoose');

// Product Schema Definition
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number, // Changed to Number
    required: false,
  },
  amount: {
    type: Number, // Changed to Number
    required: false,
  }
});

// Model for Product
const Product = new mongoose.model('Product', productSchema);
module.exports = Product;
