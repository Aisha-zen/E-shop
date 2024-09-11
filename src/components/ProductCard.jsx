import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    const token = localStorage.getItem('token'); // Check for token in localStorage

    if (token) {
      // Redirect to the product detail page if the user has a token
      navigate(`/products/${product.id}`);
    } else {
      // If no token, redirect to the login page
      navigate('/login');
    }
  };

  return (
    <div onClick={handleProductClick} className="block cursor-pointer">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative">
          <img 
            src={product.image}
            alt={product.title}
            className="w-full h-60 object-contain bg-white transition-transform duration-300 transform hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
          <p className="text-lg text-gray-700">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
