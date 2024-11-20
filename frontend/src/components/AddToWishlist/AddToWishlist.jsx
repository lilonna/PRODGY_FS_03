import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

import { Link, useNavigate } from 'react-router-dom';
import './AddToWishlist.css';

const AddToWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user?.id) {
      setError('You need to log in to see your wishlist.');
      console.log('User is not logged in:', user); // Debugging
      return;
    }
    
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/wishlist/${user.id}`);
        setWishlistItems(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch wishlist items.');
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWishlist();
  }, [user]);
  
  const removeFromWishlist = async (itemId) => {
    console.log('Item ID to be removed:', itemId); // Debugging
    try {
      await axios.delete(`http://localhost:8000/api/wishlist/${itemId}`);
      setWishlistItems(wishlistItems.filter(item => item._id !== itemId)); // Ensure `_id` matches your schema
    } catch (err) {
      setError('Failed to remove item from wishlist.');
      console.error('Error removing item:', err);
    }
  };
  

  return (
    <div className="cart-wrap">


      <div className="container">

      <a className="icon-link icon-link-hover" href="/">
  Back To Home
  
</a>
        <div className="row">
          <div className="col-md-12">
            <div className="navbar bg-primary ">My Wishlist</div>
                  
            {error && 
    <p style={{ color: 'red' }}>{error}</p>
   
            
            }
                {error && 
    
        <a className="icon-link icon-link-hover" href="/login">
  Login
  
</a>
            
            }
         
          
            {loading ? (
              <p>Loading...</p>
            ) : wishlistItems.length > 0 ? (
            <div className='table-responsive'>
                <div className="table-wishlist">
              <table className="table">
                <thead>
                  <tr>
                    <th width="15%">Image</th>
                    <th width="35%">Name</th>
                    <th width="15%">Price</th>
                    <th width="20%">Add to Cart</th>
                    <th width="15%">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => (
                    <tr key={index}>
                      <td className="img-product">
                        <img
                          src={`http://localhost:8000/images/${item.productId.image}`}
                          alt={item.productId.name}
                        />
                      </td>
                      <td className="name-product">{item.productId.name}</td>
                      <td className="price">{item.productId.price}</td>
                      <td>
                        <button className="round-black-btn">Add to Cart</button>
                      </td>
                      <td className="text-center">
                        <i
                          className="trash-icon far fa-trash-alt"
                          onClick={() => removeFromWishlist(item._id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            

            ) : (
              !error && <p>No items in your wishlist</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToWishlist;







