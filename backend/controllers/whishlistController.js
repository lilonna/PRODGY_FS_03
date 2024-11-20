const Wishlist = require('../models/wishlist'); // Your Wishlist model
const Product = require('../models/db');   // Assuming this is your Product model
const User = require('../models/user');         // User model
const { Types } = require('mongoose'); // To validate ObjectId

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate userId and productId format (ObjectId)
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid userId or productId format' });
    }

    // Validate if user and product exist
    const userExists = await User.findById(userId);
    const productExists = await Product.findById(productId);

    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the user's wishlist
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: 'Product is already in the wishlist' });
    }

    // Add product to wishlist
    const newWishlistItem = new Wishlist({ userId, productId });
    await newWishlistItem.save();

    res.status(201).json({ message: 'Product added to wishlist', newWishlistItem });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Failed to add to wishlist', error: error.message });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate userId and productId format (ObjectId)
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid userId or productId format' });
    }

    // Delete wishlist item
    const item = await Wishlist.findOneAndDelete({ userId, productId });
    if (!item) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ message: 'Failed to remove product from wishlist', error: error.message });
  }
};

// Fetch all wishlist items for a user
const getWishlist = async (req, res) => {
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

    // Fetch wishlist items and populate product details
    const wishlistItems = await Wishlist.find({ userId }).populate('productId');
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
  }
};

// Get the count of items in the user's wishlist
const getWishlistCount = async (req, res) => {
  const userId = req.params.userId;
  console.log('Fetching wishlist for userId:', userId); // Log the userId being queried
  
  try {
    const wishlist = await Wishlist.find({ userId: userId });
    console.log('Fetched wishlist:', wishlist); // Log the fetched wishlist
    
    if (!wishlist || wishlist.length === 0) {
      return res.status(404).json({ message: 'Wishlist not found for the user' });
    }

    const count = wishlist.length; // Count the number of wishlist items
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { addToWishlist, removeFromWishlist, getWishlist, getWishlistCount };


