import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    setCartItems((prev) => {
      const newItems = [...prev];
      newItems[index].quantity = quantity;
      return newItems;
    });
  };

  const addToWishlist = (item) => {
    setWishlistItems((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, addToWishlist, wishlistItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
