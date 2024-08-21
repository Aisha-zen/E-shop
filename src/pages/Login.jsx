import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after login

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null); // For displaying errors
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Handle successful authentication
        console.log('Login successful:', data);
        // Redirect to another page
        navigate('/'); // Replace with your target route
      } else {
        // Handle errors
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-40">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
