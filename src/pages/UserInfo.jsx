import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserInfo = ({ onSubmit }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [shoppingMall, setShoppingMall] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      age,
      gender,
      shoppingMall,
    };

   
    // Redirect to the homepage after submission
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="max-w-lg mx-auto mb-10  px-4 sm:px-6 lg:px-8 mt-40">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-900">Complete Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Age Input */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold sm:text-sm"
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Gender Input */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold sm:text-sm"
            required
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        {/* Shopping Mall Input */}
        <div>
          <label htmlFor="shoppingMall" className="block text-sm font-medium text-gray-700">Shopping Mall</label>
          <select
            id="shoppingMall"
            value={shoppingMall}
            onChange={(e) => setShoppingMall(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold sm:text-sm"
            required
          >
            <option value="">Select a shopping mall</option>
            <option value="mall_1">Mall 1</option>
            <option value="mall_2">Mall 2</option>
            <option value="mall_3">Mall 3</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gold hover:bg-emerald-green focus:outline-none sm:w-auto sm:px-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
