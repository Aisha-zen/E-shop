import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import PurchaseComplete from './pages/PurchaseComplete';
import PaymentDetails from './pages/PaymentDetails';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import { useCart } from './components/context/CartContext';

const App = () => {
  const { setCartItems } = useCart();

  useEffect(() => {
    const rehydrateCart = async () => {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage

      if (token) {
        try {
          const response = await axios.get('/cart', {
            headers: { Authorization: `Bearer ${token}` } // Send token in request headers
          });
          localStorage.setItem('cartItems', JSON.stringify(response.data)); // Store cart data in localStorage
          setCartItems(response.data); // Update the cart state
        } catch (error) {
          console.error('Failed to rehydrate cart:', error); // Handle errors
        }
      }
    };

    rehydrateCart(); // Call the function to rehydrate cart on app load
  }, [setCartItems]); // Dependency array ensures the effect runs only when setCartItems changes

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/cart', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCartItems(response.data); // Update cart state
        } catch (error) {
          console.error('Failed to load cart:', error);
        }
      }
    };

    loadCart(); // Load cart on app start
  }, [setCartItems]);



  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
            <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
            <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
\            <Route path="/about" element={<ProtectedRoute element={<About />} />} />
            <Route path="/contact" element={<ProtectedRoute  element={<Contact />} />} />
            <Route path="/category/:categoryName" element={<ProtectedRoute element={<CategoryPage />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/wishlist" element={<ProtectedRoute element={<Wishlist />} />} />
            <Route path='/complete' element={<ProtectedRoute element={<PurchaseComplete/>} />} />
            <Route path='/paymentdetails' element={<ProtectedRoute element={<PaymentDetails/>} />} />




            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
