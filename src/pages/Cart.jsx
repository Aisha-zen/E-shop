import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
  };

  const handleIncreaseQuantity = (index) => {
    const newQuantity = cartItems[index].quantity + 1;
    updateQuantity(index, newQuantity);
  };

  const handleDecreaseQuantity = (index) => {
    const newQuantity = cartItems[index].quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(index, newQuantity);
    } else {
      handleRemoveFromCart(index);
    }
  };

  const handleToggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl lg:mt-20 mt-[7rem]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center bg-white p-4 border rounded shadow-sm mb-4">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />

              {/* Product Details */}
              <div className="flex-1">
                <p className="lg:text-lg text-sm font-semibold mb-1">{item.title}</p>
                <p className="text-gray-600 text-xs lg:text-[1rem] mb-1">Price: ${item.price}</p>

                {/* Quantity Control */}
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
                <button
                  onClick={() => handleToggleWishlist(item)}
                  className={`text-red-500 ${isInWishlist(item.id) ? 'fill-red-500' : 'hover:text-red-700'}`}
                >
                  {isInWishlist(item.id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                </button>
              </div>
            </div>
          ))}
          <button className="bg-[#D4AF37] text-white px-4 py-2 mt-4 rounded">
            <Link to="/checkout">Proceed to Checkout</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
