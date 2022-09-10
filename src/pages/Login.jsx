import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form input
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true); 

    try {
      // Send login request to API
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      console.log("Form Data:", formData);

      const data = await response.json();

      // Check if the login request was successful
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);  // Store token in localStorage
        console.log('Login successful:', data);
        navigate('/');  // Navigate to homepage on success
        setError(null);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);  // Stop loading spinner
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
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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
