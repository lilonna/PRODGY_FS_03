
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './register.css'; 
import Navbar from '../../components/navbar/navbar';


function Register() {
  const navigate = useNavigate();  // Corrected useNavigate
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = data;

    if (!fname || !lname || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('/register', { fname, lname, email, password });
      const { data } = response;

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          fname: '',
          lname: '',
          email: '',
          password: '',
        });
        toast.success('Registered successfully');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
   <div> <Navbar/>
   <div className="d-flex justify-content-center mt-5" style={{ minHeight: '80vh', alignItems: 'center' }}>
     <div className="card" style={{ width: '20rem' }}>
       <div className="card-body">
         <h5 className="card-title text-center">Create an Account</h5>
         
         <form onSubmit={registerUser}>
           <div className="form-floating mb-3">
             <input
               type="text"
               className="form-control"
               id="floatingFname"
               placeholder="First name"
               value={data.fname}
               onChange={(e) => setData({ ...data, fname: e.target.value })}
               autoComplete="off" />
             <label htmlFor="floatingFname">First Name</label>
           </div>

           <div className="form-floating mb-3">
             <input
               type="text"
               className="form-control"
               id="floatingLname"
               placeholder="Last name"
               value={data.lname}
               onChange={(e) => setData({ ...data, lname: e.target.value })}
               autoComplete="off" />
             <label htmlFor="floatingLname">Last Name</label>
           </div>

           <div className="form-floating mb-3">
             <input
               type="email"
               className="form-control"
               id="floatingEmail"
               placeholder="name@example.com"
               value={data.email}
               onChange={(e) => setData({ ...data, email: e.target.value })}
               autoComplete="off" />
             <label htmlFor="floatingEmail">Email Address</label>
           </div>

           <div className="form-floating mb-3">
             <input
               type="password"
               className="form-control"
               id="floatingPassword"
               placeholder="Password"
               value={data.password}
               onChange={(e) => setData({ ...data, password: e.target.value })}
               autoComplete="off" />
             <label htmlFor="floatingPassword">Password</label>
           </div>

           <button type="submit" className="btn btn-primary w-100">Submit</button>
         </form>

         <p className="mt-3 text-center">
           <span>Do you have an account? </span>
           <a href="/login" className="text-decoration-none">Sign In</a>
         </p>
       </div>
     </div>
   </div></div>
  );
}

export default Register;
