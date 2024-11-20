// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Category.css'
import fashion from '../../img/fashion.jpg'
import electronics from '../../img/elecrtonics.jpg'
import grocery from '../../img/grocery.jpg'
import health from '../../img/health.jpg'
import jew from '../../img/jew.jpg'
import cosmo from '../../img/cosmo.jpg'
import book from '../../img/book.jpg'
import fur from '../../img/fur.jpg'
function Category() {
    const [navparams,Setnavparams]=useState('');

  return (
<div className='row cat-wrapper '>
    <h1>Categories</h1>
<a className='m-auto col-11 col-md-6 col-lg-3'onClick={()=>{Setnavparams('Fashion')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={fashion} alt="" /></a>
                    <h1 className='card-text'>Fashion</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Electronics')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={electronics} alt="" /></a>
                    <h1 className='card-text'>Electronics</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Grocery')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={grocery} alt="" /></a>
                    <h1 className='card-text'>Grocery</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Health')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={health} alt="" /></a>
                    <h1 className='card-text'>Health</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3'onClick={()=>{Setnavparams('Furniture')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={fur} alt="" /></a>
                    <h1 className='card-text'>Furniture</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Jewelry')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={jew} alt="" /></a>
                    <h1 className='card-text'>Jewelry</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Cosmotics')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={cosmo} alt="" /></a>
                    <h1 className='card-text'>Cosmotics</h1>
                </div>
            </a>
            <a className='m-auto col-11 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Books')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={book} alt="" /></a>
                    <h1 className='card-text'>Books</h1>
                </div>
            </a>

        </div>  )
}

export default Category