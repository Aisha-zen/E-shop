import React, { useState, useEffect } from 'react';
import { useWishlist } from '../components/context/WishlistContext';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl mt-20">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-lg">Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="flex items-center bg-white p-4 border rounded shadow-sm mb-4">
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />

            {/* Product Details */}
            <div className="flex-1">
              <p className="text-lg font-semibold mb-1">{item.title}</p>
              <p className="text-gray-600 mb-1">Price: ${item.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
