import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <nav className="bg-primary text-white fixed top-0 left-0 w-full z-20 ">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between p-4">
        {/* Top Section - Desktop View */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            E-Shop
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={handleMenuToggle}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
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
            <button onClick={handleAccountToggle} className="flex items-center space-x-1 hover:bg-secondary p-2 rounded">
              <FaUser />
              <FaChevronDown />
            </button>
            {isAccountOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                <Link to="/login" className="block p-2 hover:bg-gray-100 text-center">
                  <button className="bg-primary text-white w-full py-2 rounded">Sign In</button>
                </Link>
                <Link to="/signup" className="block p-2 hover:bg-gray-100">Register</Link>
                <Link to="/my-orders" className="block p-2 hover:bg-gray-100">My Orders</Link>
                <Link to="/payment" className="block p-2 hover:bg-gray-100">Payment</Link>
                <Link to="/wishlist" className="block p-2 hover:bg-gray-100">Wishlist</Link>
                <Link to="/settings" className="block p-2 hover:bg-gray-100">Settings</Link>
              </div>
            )}
          </div>

          {/* Country Section */}
          <div className="relative">
            <button onClick={handleCountryToggle} className="flex items-center space-x-1 hover:bg-secondary p-2 rounded">
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

          {/* Cart */}
          <Link to="/cart" className="hover:bg-secondary p-2 rounded">
            <FaShoppingCart />
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-y-0 left-0 bg-primary text-white w-4/5 max-w-xs z-50 transform transition-transform duration-300 ease-in-out"
               style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
            <div className="flex flex-col h-full p-4 space-y-4">
              <button onClick={handleMenuToggle} className="text-2xl mb-4">
                <FaTimes />
              </button>

              {/* Categories Section */}
              <div className="relative w-full">
                <button onClick={handleCategoriesToggle} className="flex items-center justify-between w-full space-x-1 hover:bg-secondary p-2 rounded">
                  <span>Popular Categories</span>
                  <FaChevronDown />
                </button>
                {isCategoriesOpen && (
                  <div className="mt-2 bg-white text-black rounded shadow-lg w-full">
                    <Link to="/" className="block p-2 hover:bg-gray-100">All</Link>
                    <Link to="/category/electronics" className="block p-2 hover:bg-gray-100">Electronics</Link>
                    <Link to="/category/jewelery" className="block p-2 hover:bg-gray-100">Jewelery</Link>
                    <Link to="/category/men's-clothing" className="block p-2 hover:bg-gray-100">Men's Clothing</Link>
                    <Link to="/category/women's-clothing" className="block p-2 hover:bg-gray-100">Women's Clothing</Link>
                   
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
                  <span>Help Center</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
              {/* Search Input - Mobile */}
        <div className="relative w-full flex md:hidden p-4 mx-auto">
        <input
          type="text"
          placeholder="Search for products..."
          className="p-2 pl-3 border rounded-full w-full text-black"
        />
        <FaSearch className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
    </nav>
  );
};

export default Navbar;

 