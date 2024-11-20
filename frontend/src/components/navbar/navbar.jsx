import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../context/userContext';
import { useSearch } from '../../../context/SearchContext'; // Import the custom hook
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import Logout from '../logout/logout';
import axios from 'axios'; 
import './navbar.css'; // Import your CSS file

const Navbar = ({ setFilteredProducts }) => {  // Accept prop to pass filtered products
  const { user, setUser } = useContext(UserContext);
  const { items } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);
  const {  setSearchTerm } = useSearch()|| {};  
  const { searchTerm } = useSearch() || {}; // Fallback to an empty object if useSearch returns undefined


  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);  // Update the global search term
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);

    // Fetch products based on searchTerm
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/search?term=${searchTerm}`);
        setFilteredProducts(response.data); // Pass the filtered products to the parent (Ustore component)
      } catch (err) {
        console.error('Error fetching filtered products:', err);
      }
    };

    fetchFilteredProducts();
  };

  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/wishlist/count/${user.id}`);
        setWishlistCount(response.data.count || 0); // Update count
      } catch (err) {
        console.error('Error fetching wishlist count:', err);
      }
    };
    if (user?.id) fetchWishlistCount();
  }, [user]);

  const renderNavLinks = () => (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {['Home', 'All Categories', 'New Arrivals', 'Featured Products', 'Electronics', 'Fashions', 'Accessories', 'Home', 'Appliances'].map((link, index) => (
        <li className="nav-item" key={index}>
          <Link className="nav-link" to="#">{link}</Link>
        </li>
      ))}
    </ul>
  );

  const renderTopNav = () => (
    <div className="row">
      <div className="col-md-2 my-auto d-none d-md-block">
        <h5 className="brand-name">Funda Ecom</h5>
      </div>
      <div className="col-md-5 my-auto">
        <form role="search" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input type="search" placeholder="Search your product" className="form-control" value={searchTerm} onChange={handleSearchChange} />
            <button className="btn bg-white" type="submit" style={{ height: '38px', padding: '0 10px' }}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-5 my-auto">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link" to="addtocart">
              <i className="fa fa-shopping-cart"></i> Cart ({items.length} )
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="addtowishlist">
              <i className="fa fa-heart"></i> Wishlist ({wishlistCount})
            </Link>
          </li>
          {user ? (
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                <i className="fa fa-user"></i> {user.username}
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#"><i className="fa fa-user"></i> Profile</Link></li>
                <li><Link className="dropdown-item" to="#"><i className="fa fa-list"></i> My Orders</Link></li>
                <li><Link className="dropdown-item" to="wishlist"><i className="fa fa-heart"></i> My Wishlist</Link></li>
                <li><Link className="dropdown-item" to="#"><i className="fa fa-shopping-cart"></i> My Cart</Link></li>
                <li><Logout /></li>
              </ul>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="register">Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="main-navbar shadow-sm sticky-top">
      <div className="top-navbar">
        <div className="container-fluid">{renderTopNav()}</div>
      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand d-md-none" to="#">Funda Ecom</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {renderNavLinks()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;




