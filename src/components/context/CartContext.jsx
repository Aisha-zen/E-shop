import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage on mount
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    // Load wishlist items from localStorage on mount
    const storedWishlistItems = localStorage.getItem('wishlistItems');
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to localStorage whenever cartItems changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save wishlist items to localStorage whenever wishlistItems changes
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((i) => i.id === item.id);
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      }
      // Add new item if not found
      return [...prev, item];
    });
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

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, isInWishlist, wishlistItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
