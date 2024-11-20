import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Electronics.css';
import { FaHeart, FaShoppingCart, FaShoppingBag } from 'react-icons/fa'; // Import Buy icon
import { useCart } from 'react-use-cart';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

function Electronics() {
  const { productType } = useParams(); // Using useParams here
  const [data, Setdata] = useState([]);
  const { addItem } = useCart(); // Add to cart functionality

  useEffect(() => {
    fetch(`http://localhost:8000/Products/see/${productType}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((response) => {
        Setdata(response);
      });
  }, [productType]); // Adding productType as a dependency

  const { user } = useContext(UserContext); // Fetch user

  // Handle Add to Wishlist
  const handleAddToWishlist = async (product) => {
    const userId = user?.id; // Ensure userId is available
    if (!userId) {
      console.error('User is not logged in');
      alert('Please log in to add items to your wishlist.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/wishlist/add', {
        userId,
        productId: product._id, // Assuming product has an '_id' field
      });
      console.log('Added to wishlist:', response.data);
      alert('Product added to wishlist!');
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  // Handle Buy Now functionality (could redirect to a purchase page or start checkout)
  const handleBuyNow = (product) => {
    alert(`Buying ${product.name}! Proceed to checkout.`);
    // You can add redirection or other logic for the purchase flow here
  };

  return (
    <div className="electronics-container">
      <h1 className="category-title">{productType}</h1>
      <div className="product-list row">
        {data.map((product, index) => (
          <div key={index} className="product-card col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="product-image">
              <img
                className="product-img"
                src={`http://localhost:8000/images/${product.image}`}
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover' }} // Keeps image consistent
              />
            </div>
            <div className="product-details">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">Price: ${product.price}</p>
            </div>
            <div className="card-actions d-flex justify-content-between align-items-center">
              {/* Add to Wishlist icon */}
              <FaHeart
                onClick={() => handleAddToWishlist(product)}
                className="text-danger"
                size={24}
                style={{ cursor: 'pointer' }}
                title="Add to Wish List"
              />
              {/* Add to Cart icon */}
              <FaShoppingCart
                onClick={() => addItem({ id: product._id, ...product })}
                className="text-primary"
                size={24}
                style={{ cursor: 'pointer' }}
                title="Add to Cart"
              />
              {/* Buy Now icon */}
              <FaShoppingBag
                onClick={() => handleBuyNow(product)}
                className="text-success"
                size={24}
                style={{ cursor: 'pointer' }}
                title="Buy Now"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Electronics;






