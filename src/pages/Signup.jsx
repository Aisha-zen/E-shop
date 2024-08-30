import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful! Redirecting to homepage...');
        setError(null);
        setTimeout(() => {
          navigate('/'); // Navigate to homepage after a short delay
        }, 2000);
      }else {
          if (data.message === 'User already exists') {
            setError('User already exists.');
          } else {
        setError(data.message || 'Signup failed. Please try again.');
        setSuccess(null);
          }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess(null);
      console.error('Signup error:', error);
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 lg:mt-[5rem]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 pl-10 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              disabled={loading} // Disable input during loading
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
              disabled={loading} // Disable input during loading
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
              disabled={loading} // Disable button during loading
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="p-3 pl-10 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              disabled={loading} // Disable input during loading
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400"
              disabled={loading} // Disable button during loading
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-white py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-colors"
            disabled={loading} // Disable submit button during loading
          >
            {loading ? 'Signing Up...' : 'Sign Up'} {/* Show loading text during loading */}
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-gold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
