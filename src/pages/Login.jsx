import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true); // Set loading state to true when the form is submitted

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in local storage
        console.log('Login successful:', data);
        navigate('/'); // Redirect to dashboard after login
        setError(null); // Clear any previous error messages
      } else {
        if (data.message === 'Invalid credentials') {
          setError('No account found. Please check your credentials.');
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Reset loading state after the request is completed
    }
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save JWT token
  
      // Load and sync the cart
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCart = await syncCart(cartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart); // Update cart state
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 lg:mt-[3rem]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 pl-10 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="p-3 pl-10 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-white py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Logging in...' : 'Login'} {/* Show loading text when loading */}
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-gold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
