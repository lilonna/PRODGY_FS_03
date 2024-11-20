// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from 'react'
import './EditPage.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import bg from '../../img/bg.png'
import axios from 'axios';
function EditPage() {
  const [fetched,Setfetched] =useState({});
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
  const[dimage,Setdimage]=useState('');
  const { Id } = useParams();
  const navigate = useNavigate();
  
      useEffect(() => {
        fetch(`http://localhost:8000/products/get/${Id}`,{
          method:'GET'
        })
        .then((response)=>response.json())
        .then((result)=>{
            Setfetched(result);
            Setname(result.name);
            Setcategory(result.category);
            Setdescription(result.description);
            Setprice(result.price);
            Setamount(result.amount);
            Setimage(result.image);
            Setdimage(`http://localhost:8000/images/${result.image}`)
        })
      }, [Id]);
console.log(name);
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

      async function editItem(e){
        e.preventDefault();
      try{
        toast.success('product editted successfully',{
          autoClose:2000,
          onClose:setTimeout(() => {
            navigate('/see-store');
          }, 3000)
        });
        const formData = new FormData(); 
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('amount', amount);
        formData.append('image', image);
        console.log(formData);
              const response = await axios.put(`http://localhost:8000/products/edit/${Id}`, formData);
        
              if (response.status === 200) {
                console.log('Item edited successfully');
              } else {
                console.error('Failed to edit item');
              }
            } catch (error) {
              console.error('Error editing item:', error.response);
            }
          }

      // console.log(fetched);
  return (
    <div className='edit-wrapper d-flex'>
    
        <form encType='multipart/form-data' className='add-form custom-sm2 p-5 custom-md1 pt-lg-3 pb-lg-3 col-lg-7'>
        <h3>Edit a Product</h3>
          <div className='row infos'>
          <div className='col-lg-12'>
        <label className='col-12'>Product name:</label>
        <input className='col-12' type="text" value={name} onChange={(e)=>{Setname(e.target.value)}} />
        </div>
        <div className='col-lg-12'>
        <label className='col-12'>Product category:</label>
        <select className='col-12' onChange={(e)=>{Setcategory(e.target.value)}} value={category}>
        <option value='Fashion'>Fashion</option>
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
          <div className='col-lg-12'> 
        <label className='col-12 '>Product Price:</label>
        <input className='col-12' type="number" value={price} onChange={(e)=>{Setprice(e.target.value)}} />
        </div>
        <div className='col-lg-12'>
        <label className='col-12'>Product Amount:</label>
        <input className='col-12' type="number" value={amount} onChange={(e)=>{Setamount(e.target.value)}} />
        </div>
          <div className='col-lg-12'>
          <div className='img-wrap '> <input className='image-input' accept='image/*'name='image' type="file"onChange={(e)=>Base64(e)}/> 
           <button className='custom-button'>add image</button></div>
           <br />
          <img className='choosen-image' src={dimage} alt="" />
        </div>
       
        <div className='col-12 col-lg-12'> 
          <label>Description</label>
          <textarea className='description col-12' name="description" value={description} onChange={(e)=>{Setdescription(e.target.value)}} cols="35" rows="5"></textarea>
        </div>
       
        <div className='btn-container'>
          <button className='btn' onClick={editItem}>submit</button>
        </div>
          </div>
          </form>
          <div className='d-none d-lg-block cols-lg-5'>
      <img src={bg} alt="" />
      </div>
     
      
</div>
  )
}

export default EditPage