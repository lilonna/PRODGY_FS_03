const Cart = require('../models/cart'); //  to 'cart'
const Product = require('../models/db');   // Assuming this is your Product model
const User = require('../models/user');         // User model
const { Types } = require('mongoose'); // To validate ObjectId

// Add product to cart


// Function to add product to cart
const addToCart = async (req, res) => {
  const userId = req.user.id;  // Assuming you're using JWT for authentication and have user ID
  const productId = req.body.productId;
  const quantity = req.body.quantity || 1; // Default to 1 if no quantity is provided

  try {
    // Find the user's cart, or create a new one if it doesn't exist
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ user: userId, products: [{ productId, quantity }] });
      await cart.save();
      return res.status(200).json({ message: 'Product added to new cart', cart });
    }

    // Check if the product is already in the cart
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex === -1) {
      // If product is not found in the cart, add it
      cart.products.push({ productId, quantity });
    } else {
      // If product is already in the cart, update the quantity
      cart.products[productIndex].quantity += quantity;
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding product to cart' });
  }
};




// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate userId and productId format (ObjectId)
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid userId or productId format' });
    }

    // Delete cart item
    const item = await Cart.findOneAndDelete({ userId, productId });
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
  }
};

// Fetch all cart items for a user
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format (ObjectId)
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    // Validate if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch cart items and populate product details
    const cartItems = await Cart.find({ userId }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
};

// Get the count of items in the user's cart
const getCartCount = async (req, res) => {
  const userId = req.params.userId;
  console.log('Fetching cart for userId:', userId); // Log the userId being queried
  
  try {
    const cart = await Cart.find({ userId: userId });
    console.log('Fetched cart:', cart); // Log the fetched cart
    
    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: 'Cart not found for the user' });
    }

    const count = cart.length; // Count the number of cart items
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart, removeFromCart, getCart, getCartCount };


