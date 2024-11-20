import React, { useEffect, useState, useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTags } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { useSearch } from '../../../context/SearchContext'; // Import the search context
import './ustore.css';

function Ustore() {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext); 
  const { searchTerm } = useSearch(); // Fetch search term from context
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/products/get')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add to Wishlist
  const handleAddToWishlist = async (product) => {
    const userId = user?.id;
    if (!userId) {
      console.error('User is not logged in');
      alert('Please log in to add items to your wishlist.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/wishlist/add', {
        userId,
        productId: product._id,
      });
      console.log('Added to wishlist:', response.data);
      alert('Product added to wishlist!');
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  const handleAddToCart = async (product) => {
    const userId = user?.id;
    if (!userId) {
      console.error('User is not logged in');
      alert('Please log in to add items to your cart.');
      return;
    }

    const requestBody = {
      userId,
      productId: product._id,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/cart/add', requestBody);
      console.log('Added to cart:', response.data);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="card-wrapper">
      {/* Product list */}
      <Row className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '18rem' }} className="shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  src={`http://localhost:8000/images/${product?.image}`}
                  alt={product?.name || 'No Name'}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product?.name || 'No Name'}</Card.Title>
                  <Card.Text>
                    {product?.description || 'Some quick example text to build on the card title.'}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{ fontWeight: 'bold', color: '#333' }}>
                      ${product?.price || 'N/A'}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {product?.category || 'N/A'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <FaHeart
                        onClick={() => handleAddToWishlist(product)}
                        className="text-danger"
                        size={24}
                        style={{ cursor: 'pointer' }}
                        title="Add to Wish List"
                      />
                    </div>
                    <FaShoppingCart
                      onClick={() => handleAddToCart(product)}
                      className="text-primary"
                      size={24}
                      style={{ cursor: 'pointer' }}
                      title="Add to Cart"
                    />
                    <Link to={`/sell-product/${product._id}/${product.name}/${product.price}/${product.amount}`}>
                      <FaTags
                        className="text-success"
                        size={24}
                        style={{ cursor: 'pointer' }}
                        title="Buy"
                      />
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </Row>
    </div>
  );
}

export default Ustore;






















