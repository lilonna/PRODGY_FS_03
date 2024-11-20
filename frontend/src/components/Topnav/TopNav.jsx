// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'; 
import './TopNav.css'
import hamburger from '../../img/hamburger.png'
import menu from '../../img/menu.png'
import addProduct from '../../img/addProduct.png'
import see from '../../img/eye.png'
import category from '../../img/category.png'

function TopNav() {
  const [state,setstate] = useState(false)
  const [value,setvalue] = useState('')
  const [search,Setsearch]=useState();
  const [searchResult,SetsearchResult]=useState([]);
  //  const history = useHistory();
  useEffect(()=>{
    state?setvalue('d-block'):setvalue('d-none')
    try{
      fetch(`http://localhost:8000/products/search/${search}`,{
        method: 'GET',
      })
      .then((res)=>res.json())
      .then((product)=>{SetsearchResult(product)})
      if (search === '') {
        SetsearchResult([]);
        return;
      }
    }
  catch(err) {
    console.log(err.message);
  }
  },)
  function toogle(){
    setstate(!state)
  };
  // const handleProductClick = (productId) => {
  //   history.push(`/products/${productId}`); // Redirect to product detail page
  // };
  // Function to handle product click
  // const handleProductClick = (productId) => {
  //   history.push(`/products/${productId}`); // Redirect to product detail page
  // };
  return (<>
    <div className='top-nav items '> 
    <img className='hamburger d-md-none' onClick={toogle} src={hamburger} alt="" />   
  
       <div className='search-wrapper '> <input className=' search-bar search '  type="text" placeholder='  search ...' onChange={(e) => { Setsearch(e.target.value) }} /></div>
    </div>
    <div className='row search-results res-sm res-md res-lg'>
        {searchResult.map((i, index) => {
          const cardstatus =i.amount>40?' sufficient':'insufficient';
          const status = i.amount>40?'sufficient':'insufficient';
          return(<div key={index} className="card col-8  onClick={() => handleProductClick(i._id)}">
                        <div className={`status ${cardstatus}`}>{status}</div>

            <div className='imgs'><div className='img'><img className='cards-img' src={`http://localhost:8000/images/${i.image}`} alt="" /></div></div>
            <div className='product-detail'>
              <h4>{i.name}</h4>
              <p>category: {i.category}</p>
              <p>{i.description}</p>
              <p>Price: {i.price}</p>
              <p>Amount: {i.amount}</p>
            </div>
          </div>)
})}
 </div>
    <div className={`menu-wrapper ${value}`} >
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
        <a href="/cat"><img src={category} alt="" />  Category</a>
        </div>
      

      </div>
    </div>
   
   
    </>
  )
}

export default TopNav