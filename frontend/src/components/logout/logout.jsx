import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../context/userContext'; // or wherever your context is

const Logout = () => {
  const { setUser } = useContext(UserContext); // To reset user state in context
  const navigate = useNavigate(); // To navigate to another page (e.g., login page)

  const handleLogout = async () => {
    try {
      // Call the logout API to clear the session cookie
      await axios.get('http://localhost:8000/logout');
      
      // Reset the user context or state
      setUser(null); // This will reset the user data in the context (ensure you have a function to update the context)

      // Optionally, you can also clear other stored data like localStorage if you're using it
      localStorage.removeItem('user'); // If you're storing user data in localStorage

      // Redirect to login page or home page
      navigate('/');  // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <Link className="dropdown-item " onClick={handleLogout} to="/"><i className="fa fa-sign-out"></i> Logout</Link>
  );
};

export default Logout;

