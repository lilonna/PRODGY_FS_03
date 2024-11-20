const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController'); // Updated controller import
const { Types } = require('mongoose');
const Cart = require('../models/cart'); // Update model import to Cart

const router = express.Router();

// Add product to cart
router.post('/add', addToCart); // Add product to cart

// Remove product from cart
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    // Validate itemId format
    if (!Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid itemId format' });
    }

    const item = await Cart.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ message: 'Failed to remove item', error: error.message });
  }
});

// Fetch cart for user
router.get('/:userId', getCart); // Fetch cart for user

// Get the count of items in the cart for a user
router.get('/count/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching cart count for userId:', userId); // Debugging

  // Validate userId format
  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  try {
    const count = await Cart.countDocuments({ userId });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    res.status(500).json({ message: 'Failed to fetch cart count' });
  }
});

module.exports = router;




  
