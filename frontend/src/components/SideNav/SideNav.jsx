// eslint-disable-next-line no-unused-vars
import React from 'react'
import menu from '../../img/menu.png'
import addProduct from '../../img/addProduct.png'
import see from '../../img/eye.png'
import category from '../../img/category.png'
import Logout from '../logout/logout'

import './SideNav.css'
function SideNav() {
  return (
    <div className='bg-dark nav-wrapper d-none d-md-inline'>
      <div className='menu'>
        <div className='side-menu'>
          <a href="/dashboard"><img src={menu} alt="" /> Dashboard</a>
        </div>
        <div className='side-menu'>
          <a href="/add-product"><img src={addProduct} alt="" /> Add product</a>
        </div>
        <div className='side-menu'>
          <a href="/see-store"><img src={see} alt="" />  See Store</a>
        </div>
        <div className='side-menu'>
          <a href="/cat"><img src={category} alt="" />  Category</a><br/>
          
          
        </div>
        <div className='side-menu'>
        <Logout/>
          
          
        </div>
        
        
<div>

</div>
      </div>

    </div>
  )
}

export default SideNav;