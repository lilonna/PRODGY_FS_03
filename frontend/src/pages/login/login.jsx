import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

function Login() {
  const [data, setData] = useState({ email: '', password: '' }); // Initialize data state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the correct field
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
  
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/login', { email, password });
  
      console.log('Response data:', response.data);
  
      // Extract user data directly
      const { email: userEmail, fname, role } = response.data;
  
      if (!role) {
        throw new Error('Invalid response format from the server');
      }
  
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.error || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar />
      <form onSubmit={loginUser}>
        <div className="d-flex justify-content-center" style={{ minHeight: '60vh', alignItems: 'center' }}>
          <div className="card" style={{ width: '20rem' }}>
            <div className="card-body">
              <h5 className="card-title text-center">Login To Your Account</h5>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {/* Centering the button */}
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
