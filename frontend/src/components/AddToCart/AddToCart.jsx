import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import './AddToCart.css';

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);  // Changed wishlistItems to cartItems
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setError('You need to log in to see your cart.');  // Updated error message for cart
      console.log('User is not logged in:', user); // Debugging
      return;
    }

    const fetchCart = async () => {  // Updated to fetchCart from fetchWishlist
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/cart/${user.id}`);  // Changed endpoint to cart
        setCartItems(response.data);  // Set cart items instead of wishlistItems
        setError(null);
      } catch (err) {
        setError('Failed to fetch cart items.');  // Updated error message for cart
        console.error('Error fetching cart:', err);  // Updated log for cart
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const removeFromCart = async (itemId) => {  // Changed function to removeFromCart
    console.log('Item ID to be removed from cart:', itemId);  // Debugging log updated for cart
    try {
      await axios.delete(`http://localhost:8000/api/cart/${itemId}`);  // Changed endpoint to cart
      setCartItems(cartItems.filter(item => item._id !== itemId));  // Ensure _id matches your schema
    } catch (err) {
      setError('Failed to remove item from cart.');  // Updated error message for cart
      console.error('Error removing item from cart:', err);  // Updated log for cart
    }
  };

  return (
    <div className="bodyi bg-dark-subtle">
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div>
            <a className="icon-link icon-link-hover" href="/">Back To Home</a>
          </div>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              {cartItems.length === 0 ? (
                <div><h5 className="text-center">Your cart is empty</h5></div>
              ) : (
                <>
                  <div className="card mb-4">
                    <div className="card-header bg-primary py-3">
                      <h5 className="mb-0">Cart - {cartItems.length} items</h5>
                    </div>
                    <div className="card-body">
                      {cartItems.map((item) => (
                        <div key={item.id}>
                          <div className="row">
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                              <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                <img   src={`http://localhost:8000/images/${item.productId.image}`} className="w-100" />
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-6">
                              <p><strong>{item.productId.name}</strong></p>
                              <p>Price: ${item.productId.price}</p>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm me-1 mb-2"
                                onClick={() => removeFromCart(item.productId.id)} // Trigger removal when button is clicked
                              >
                                <i className="fas fa-trash"></i> Remove
                              </button>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="d-flex">
                                <button
                                  className="btn btn-primary px-3 me-2"
                                  onClick={() => updateItemQuantity(item.productId.id, item.quantity - 1)} // Implement updateItemQuantity
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <input
                                  type="number"
                                  value={item.productId.quantity}
                                  readOnly
                                  className="form-control text-center"
                                  style={{ width: '60px' }}
                                />
                                <button
                                  className="btn btn-primary px-3 ms-2"
                                  onClick={() => updateItemQuantity(item.productId.id, item.productId.quantity + 1)} // Implement updateItemQuantity
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              <p className="text-start text-md-center mt-2">
                                <strong>
                                  Total: ${(item.productId.price * item.productId.quantity).toFixed(2)}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Items
                      <span>{cartItems.reduce((total, item) => total + item.productId.quantity, 0)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      Total Price
                      <span>
                        ${cartItems.reduce((total, item) => total + item.productId.price * item.productId.quantity, 0).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                  <button
                    // onClick={handleCheckout}
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                  {error && <div className="text-danger mt-2">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddToCart;








