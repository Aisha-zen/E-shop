import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/context/CartContext'; // Import useCart
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaGlobe,
  FaChevronDown,
  FaMapMarkerAlt,
  FaDollarSign,
  FaLanguage,
  FaQuestionCircle,
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Access cart items from CartContext
  const { cartItems } = useCart();

  // Function to compute total number of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const totalItems = getTotalItems();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAccountToggle = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const handleCountryToggle = () => {
    setIsCountryOpen(!isCountryOpen);
  };

  const handleCategoriesToggle = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const closeAllOptions = () => {
    setIsAccountOpen(false);
    setIsCountryOpen(false);
    setIsCategoriesOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between p-4">
        {/* Top Section - Desktop View */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold" onClick={closeAllOptions}>
            E-Shop
          </Link>

          <div className="flex items-center justify-between gap-5">
            {/* Cart Icon - Mobile View */}
            <div className="relative md:hidden">
              <Link to="/cart" className="p-2 rounded relative">
                <FaShoppingCart className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute top-[0.9rem] -right-8 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={handleMenuToggle}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Search Input - Desktop */}
        <div className="hidden md:flex items-center justify-center flex-grow mt-4 md:mt-0">
          <div className="relative w-full md:w-3/5">
            <input
              type="text"
              placeholder="Search for products..."
              className="p-2 pl-3 border rounded-full w-full"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Account Section */}
          <div className="relative">
            <button
              onClick={handleAccountToggle}
              className="flex items-center space-x-1 p-2 rounded hover:bg-secondary"
            >
              <FaUser />
              <FaChevronDown />
            </button>
            {isAccountOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                <Link
                  to="/login"
                  className="block p-2 hover:bg-gray-100 text-center"
                  onClick={closeAllOptions}
                >
                  <button className="bg-primary text-white w-full py-2 rounded">Sign In</button>
                </Link>
                <Link to="/signup" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                  Register
                </Link>
                <Link to="/my-orders" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                  My Orders
                </Link>
                <Link to="/payment" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                  Payment
                </Link>
                <Link to="/wishlist" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                  Wishlist
                </Link>
                <Link to="/settings" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                  Settings
                </Link>
              </div>
            )}
          </div>

          {/* Country Section */}
          <div className="relative">
            <button
              onClick={handleCountryToggle}
              className="flex items-center space-x-1 p-2 rounded hover:bg-secondary"
            >
              <FaGlobe />
              <FaChevronDown />
            </button>
            {isCountryOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-56">
                <div className="p-2 border-b">Ship To</div>
                <div className="p-2">
                  <select className="w-full border rounded p-1">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
                <div className="p-2 border-b">Language</div>
                <div className="p-2">
                  <select className="w-full border rounded p-1">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    {/* Add more languages as needed */}
                  </select>
                </div>
                <div className="p-2">Currency</div>
                <div className="p-2">
                  <select className="w-full border rounded p-1">
                    <option>USD</option>
                    <option>GBP</option>
                    <option>CAD</option>
                    {/* Add more currencies as needed */}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon - Desktop View */}
          <div className="relative">
            <Link to="/cart" className="p-2 rounded relative" onClick={closeAllOptions}>
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="absolute top-[0.9rem] -right-5 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-y-0 left-0 bg-primary text-white w-4/5 max-w-xs z-50 transform transition-transform duration-300 ease-in-out"
            style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="flex flex-col h-full p-4 space-y-4">
              <button onClick={handleMenuToggle} className="text-2xl mb-4">
                <FaTimes />
              </button>

              {/* Categories Section */}
              <div className="relative w-full">
                <button
                  onClick={handleCategoriesToggle}
                  className="flex items-center justify-between w-full space-x-1 hover:bg-secondary p-2 rounded"
                >
                  <span>Popular Categories</span>
                  <FaChevronDown />
                </button>
                {isCategoriesOpen && (
                  <div className="mt-2 bg-white text-black rounded shadow-lg w-full">
                    <Link to="/products" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                      All
                    </Link>
                    <Link
                      to="/category/electronics"
                      className="block p-2 hover:bg-gray-100"
                      onClick={closeAllOptions}
                    >
                      Electronics
                    </Link>
                    <Link to="/category/jewelery" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                      Jewelery
                    </Link>
                    <Link to="/category/men" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                      Men's Clothing
                    </Link>
                    <Link to="/category/women" className="block p-2 hover:bg-gray-100" onClick={closeAllOptions}>
                      Women's Clothing
                    </Link>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="mt-4 border-t w-full pt-4">
                <div className="flex items-center p-2 hover:bg-secondary rounded">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Ship To</span>
                </div>
                <div className="flex items-center p-2 hover:bg-secondary rounded">
                  <FaDollarSign className="mr-2" />
                  <span>Currency</span>
                </div>
                <div className="flex items-center p-2 hover:bg-secondary rounded">
                  <FaLanguage className="mr-2" />
                  <span>Language</span>
                </div>
                <div className="flex items-center p-2 hover:bg-secondary rounded">
                  <FaQuestionCircle className="mr-2" />
                  <span>Help</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
