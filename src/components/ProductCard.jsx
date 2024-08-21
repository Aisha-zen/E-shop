import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative">
          <img 
            src={product.image}
            alt={product.title}
            className="w-full h-60 object-contain transition-transform duration-300 transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-25"></div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
          <p className="text-lg text-gray-700">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
