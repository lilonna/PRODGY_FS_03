// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bg from '../../img/bg.png'
import './Add.css'
import axios from 'axios';
function Add() {
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
  const [dimage,Setdimage]=useState('');
  const navigate=useNavigate();
function Base64(e){
  Setimage(e.target.files[0]);
var reader=new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload=()=>{
  Setdimage(reader.result);
  // console.log(reader.result);
};
reader.onerror=(err)=>{
  console.log('error', err);
};
}



async function submit(e){
  e.preventDefault();
try{
  toast.success('product Added successfully',{
    autoClose:2000,
    onClose:setTimeout(() => {
      navigate('/see-store');
    }, 3000)
  });
  const formdata=new FormData();
  formdata.append('image',image)
  formdata.append('name', name);
  formdata.append('category', category);
  formdata.append('description', description);
  formdata.append('price', price);
  formdata.append('amount', amount);
  console.log(formdata);
  await axios.post('http://localhost:8000/products/add',formdata )
}
catch(e){
  console.log(e);
}
}




// async function submit(e) {
//   e.preventDefault();

//   // Validate required fields
//   if (!name || !category || !price || !amount) {
//     toast.error('Please fill in all required fields');
//     return;
//   }

//   try {
//     const formdata = new FormData();
//     formdata.append('image', image);
//     formdata.append('name', name);
//     formdata.append('category', category);
//     formdata.append('description', description);
//     formdata.append('price', price);
//     formdata.append('amount', amount);

//     const response = await axios.post('http://localhost:8000/products/add', formdata);

//     if (response.status === 200) {
//       toast.success('Product added successfully');
//       navigate('/see-store'); // Move navigation here to ensure it only happens on success
//     } else {
//       toast.error('Failed to add product');
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error('An error occurred while adding the product');
//   }
// }





  return (
    <>
    <div className='add-wrapper d-flex'>
      
      <form className='add-form custom-sm2 p-5 custom-md1 pt-lg-3 pb-lg-3 col-lg-7'>
      <h3>Add New Product</h3>
      <hr />
        <div className='row infos '>
        <div className='col-lg-12'>
        <label className='col-12'>Product name:</label>
        <input className='col-12' type="text" onChange={(e)=>{Setname(e.target.value)}} />
        </div>
        <div className='col-lg-12 '>
        <label className='col-12'>Product category:</label>
        <select className='col-12' onChange={(e)=>{Setcategory(e.target.value)}} value={category}>
        <option value=''>Select Category</option>
        <option value='Fashion'>p</option>
        <option value='Electronics'>Electronics</option>
        <option value='Grocery'>Grocery</option>
        <option value='Health'>Health</option>
        <option value='Cosmotics'>Cosmotics</option>
        <option value='Books'>Books</option>
        <option value='Jewelry'>Jewelry</option>
        <option value='Furniture'>Furniture</option>
        <option value='Other'>Other</option>

      </select>
        </div>
        {/* //hjdsvhlsfk */}
        <div className='col-lg-12'> 
        <label className='col-12 '>Product Price:</label>
        <input className='col-12' type="number" onChange={(e)=>{Setprice(e.target.value)}} />
        </div>
        <div className='col-lg-12'>
        <label className='col-12'>Product Amount:</label>
        <input className='col-12' type="number" onChange={(e)=>{Setamount(e.target.value)}} />
        </div>
        <div className='col-12 col-md-12'> 
          <label>Description</label>
          <textarea className='description col-12' name="description" onChange={(e)=>{Setdescription(e.target.value)}} cols="35" rows="3"></textarea>
        </div>
        <div className='col-md-12'>
          <div className='img-wrap '> <input className='image-input' accept='image/*' type="file"onChange={(e)=>{Base64(e)}}/>
        <button className='custom-button'>add image</button></div>
        
          <img className='choosen-image' src={dimage} alt="" />        
      </div>
        
        
        <div className='btn-container'>
          <button className='btn' onClick={submit}>submit</button>
        </div>
        </div>
      </form>
      <div className='d-none d-lg-block cols-lg-5'>
      <img src={bg} alt="" />
      </div>
    </div>
    </>
  )
}

export default Add