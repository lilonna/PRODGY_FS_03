const express = require('express');
const { addToWishlist,  getWishlist} = require('../controllers/whishlistController');
const { Types } = require('mongoose');
const Wishlist = require('../models/wishlist'); // Update the path to match your directory structure




const router = express.Router();

router.post('/add', addToWishlist);              // Add product to wishlist
// Remove product from wishlist
router.delete('/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
  
      // Validate itemId format
      if (!Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId format' });
      }
  
      const item = await Wishlist.findByIdAndDelete(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found in wishlist' });
      }
  
      res.status(200).json({ message: 'Item removed from wishlist' });
    } catch (error) {
      console.error('Error removing item:', error);
      res.status(500).json({ message: 'Failed to remove item', error: error.message });
    }
  });
  // Remove product
router.get('/:userId', getWishlist);            // Fetch wishlist for user
router.get('/count/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Fetching wishlist count for userId:', userId); // Debugging
    
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }
    
    try {
      const count = await Wishlist.countDocuments({ userId });
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      res.status(500).json({ message: 'Failed to fetch wishlist count' });
    }
  });
   


module.exports = router;


