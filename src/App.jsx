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
import UserInfo from './pages/UserInfo';
const App = () => {


  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/user' element={<UserInfo />}/>

        {/* Protected Routes */}
            <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
            <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
            <Route path="/about" element={<ProtectedRoute element={<About />} />} />
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
