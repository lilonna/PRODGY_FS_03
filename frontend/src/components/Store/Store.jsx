// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Store.css'
import del from '../../img/delete.png'
import edit from '../../img/edit.png'
import sell from '../../img/sell.png'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
function Store() {
  const [search, Setsearch] = useState('');
  const [showtable, Setshowtable] = useState('d-none');
  const [showcard,Setshowcard] = useState('');
  const [data,Setdata] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:8000/products/get',{
      method: 'GET'
    })
    .then((res)=>res.json())
    .then((products)=>{
      // console.log(products);===>is to check fetch method 
      Setdata(products);
    });

  },[]);

  const deleteItem = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/products/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Item deleted successfully');
        fetch('http://localhost:8000/products/get', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((products) => {
            Setdata(products);
          });
      } else {
        console.error('Failed to delete item');
        toast.error('Failed to delete item');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred while deleting the item');
    }
  } 
function showtablefun(){
  Setshowtable('d-block')
  Setshowcard('d-none')
}
function showcardfun(){
  Setshowtable('d-none')
  Setshowcard('d-flex')
}

  return (
    <div className='card-wrapper'>
      <div className='btn-containers'>
      <button  onClick={showcardfun} >card</button>
      <button  onClick={showtablefun}>table</button>
    </div>
    <br />
    <br />

   <div className={`${showcard} card-container row`}>
    
      {data.map((i, index) => { 
          const cardstatus =i.amount>40?' sufficient':'insufficient';
          const status = i.amount>40?'sufficient':'insufficient';
          return(
         <div key={index} className='items prod card col-7 col-md-6 col-lg-4'>
            <div className={`status ${cardstatus}`}>{status}</div>
 
         <div className='imgs'><div className='img'><img className='cards-img' src={`http://localhost:8000/images/${i.image}`} alt="" /></div></div>
          <div className=' product-detail'>
            <h4>{i.name}</h4>
            <div className='desc'><p>{i.description}</p></div>
            <div className='abc'>
            <p className='desc2'>category: {i.category}</p>
            <p className='desc2'>Amount: {i.amount}</p>
            </div>
            <h4>$ {i.price}</h4>


          </div>
          <div className="card-actions">
            
            <img src={del} onClick={() => deleteItem(i._id)} alt="Delete" />
            <Link to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}>
              <img src={sell} alt="Sell" />
            </Link>

            <Link to={`/edit-product/${i._id}`}>
              <img src={edit} alt="Edit" />
            </Link>
          </div>
        </div>)
      })}
    </div>
    <div className={`${showtable}`} >
  <table className='summary-table custom-sm1 custom-md1'>
    <thead className='table-head'>
      <tr>  {/* Add a <tr> element here */}
        <th>Product Name</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {data.slice().reverse().map((i, index) => {
        const cardstatus = i.amount > 40 ? 'sufficient' : 'insufficient';
        return (
          <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{i.name}</td>
            <td>{i.category}</td>
            <td>{i.amount}</td>
            <td>{i.price}</td>
            <td><p className={`${cardstatus}`}>{cardstatus}</p></td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

   
    </div>
  );
}

export default Store;