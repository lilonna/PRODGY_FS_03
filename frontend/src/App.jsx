// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
// import { CartProvider } from 'react-use-cart';
import {Route, Routes} from 'react-router-dom'
import AddToCart from './components/AddToCart/AddToCart'
import AddToWishlist from './components/AddToWishlist/AddToWishlist'
 

import SideNav from './components/SideNav/SideNav'
import TopNav from './components/Topnav/TopNav'
import Add from './components/Add/Add'
import Store from './components/Store/Store'
import EditPage from './components/EditPage/EditPage'
import Sell from './components/Sell/Sell'
import Electronics from './components/Electronics/Electronics'
import Category from './components/Category/Category';
// import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
 import Dashboard from './pages/dashboard/dashboard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Wishlist from './pages/wishlist/wishlist';
import { UserContextProvider } from '../context/userContext';
// import { WishlistProvider } from '../context/WishlistContext'; 
//import Logout from './components/logout/logout';


import {Toaster} from 'react-hot-toast'
// import AddToWishlist from './components/AddToWishlist/AddToWishlist';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  return (
   
  <UserContextProvider>
    {/* <WishlistProvider> */}
      <div className='app-wrapper'>    
   <Toaster position='top-center' toastOptions={{duration: 2000}}/>
        

         
         <div className='right'>
          {/* <CartProvider> */}
         <Routes>

         
      
         <Route path='/' element={<Home/>}/>
         {/* <Route path='/logout' element={<Logout/>}/> */}
         <Route path='/addtowishlist' element={<AddToWishlist/>}/>
         <Route path='/addtocart' element={<AddToCart/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/add-product' element={<Add/>}/>
          <Route path='/see-store' element={<Store/>}/>
          <Route path="/edit-product/:Id?" element={<EditPage />} />
          <Route path="/sell-product/:Id?/:name?/:price?/:amount?/" element={<Sell />} />
          <Route path='/see/:productType?' element={<Electronics/>}/>
          <Route path='/cat' element={<Category/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/category' element={<Category/>}/>
         
          


         </Routes>
         {/* </CartProvider> */}

         </div>
         
         
     
      </div>
      {/* </WishlistProvider> */}
  </UserContextProvider>
  )
}

export default App