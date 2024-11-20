// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Sell.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import {useNavigate,useParams } from 'react-router-dom';

function Sell() {
    
    const { Id} = useParams();
    
    

    const [sold, setSold] = useState('');
    const [info,setinfo] = useState({});
    const navigate=useNavigate();
    

    useEffect(()=>{
       fetch(`http://localhost:8000/Products/get/${Id}`,{
        method: 'GET',
       }).then((response) => response.json())
       .then((data)=>setinfo(data))
       console.log(info)

    },[Id])


  const sendSell=  async (e)=> {
    e.preventDefault();
    const confirmed = window.confirm(`Are you sure you want to Sell ${sold} ${info.name}?`);
    if (!confirmed) {
        return;
      }
       
     try {
          const response = await fetch(`http://localhost:8000/Products/sell/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sold
            }),
          });
          
          
            if (response.ok) {
                toast.success('Item sold successfully',{autoClose:2000,
                    onClose:setTimeout(() => {
                      navigate('/see-store');
                    }, 3000)});
                
                // Handle success, e.g., display a success message
            } else {
               toast.error('Failed to sell item');
                // Handle failure, e.g., display an error message
            }
        } catch (err) {
            toast.error('An error occurred while selling the item');
            console.error('Error:', err);
            // Handle other errors, e.g., display an error message
        }

    }
    const tax = sold*info.price*0.15
    const total=sold*info.price+tax
    return (
        <div className='forms sell-wrapper add-form custom-sm1 custom-md1'>
            
            <form className=' add-form custom-sm1'>
                <h3>Selling Page</h3>
<div className='form-wrapper '>
<div>
               <label htmlFor="">Item selling :</label>
                <h6 className='d-inline'>{info.name}</h6>
                <div className=' d-md-none'>
                <img className='sells-image'  src={`http://localhost:8000/images/${info.image}`} alt="" />
               </div>
                <br />
                <label htmlFor="">Amount in stock : </label>
               <h6 className='d-inline' ><span className='fw-bold'>{info.amount}</span> {info.name}</h6>
               <br />
               <label htmlFor="">Single Item price is : </label>
                <h6 className='d-inline'>                {info.price} Birr</h6>                                <br />
                <label htmlFor="sellAmount ">
                    Enter the amount to sell : 
                </label>
               <input className='amount' type="number" onChange={(e) => setSold(e.target.value)}/>
               <br />
               <label htmlFor="">
                Tax(15%) : 
               </label>
               {tax} birr
               <br />
               
                <label htmlFor=""> Total : </label>
                {total} birr
               </div>
               <div className='d-none d-md-block'>
                <img className='sell-image'  src={`http://localhost:8000/images/${info.image}`} alt="" />
               </div>
</div>
                <button onClick={sendSell}>Sell</button>
            </form>
        </div>
    );
}

export default Sell;