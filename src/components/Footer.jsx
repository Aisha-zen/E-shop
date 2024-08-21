import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-primary text-white py-8">
    <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-5 gap-8">
      
      {/* Exclusive Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Exclusive</h3>
        <p className="mb-4">Subscribe</p>
        <p className="mb-4">Get 10% off your first order</p>
        <form className="mb-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-2 py-1 rounded text-gray-800 w-full"
          />
          <button 
            type="submit" 
            className="mt-2 bg-gold text-white px-4 py-2 rounded w-full hover:bg-emerald-green"
          >
            Subscribe
          </button>
        </form>
      </div>
      
      {/* Support Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Support</h3>
        <p>111 Futa, Akure, Nigeria.</p>
        <p className="mt-2">aisha@gmail.com</p>
        <p className="mt-2">+123-45677-2356</p>
      </div>

      {/* Account Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Account</h3>
        <ul>
          <li className="mb-2"><a href="#" className="hover:underline">My Account</a></li>
          <li className="mb-2"><a href="/login" className="hover:underline">Login / Register</a></li>
          <li className="mb-2"><a href="/cart" className="hover:underline">Cart</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Wishlist</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Shop</a></li>
        </ul>
      </div>

      {/* Quick Link Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Quick Link</h3>
        <ul className=''>
          <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Terms Of Use</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">FAQ</a></li>
          <li className="mb-2"><a href="/contact" className="hover:underline">Contact</a></li>
          <li className="mb-2"><a href="/about" className="hover:underline">About</a></li>
        </ul>
      </div>

      {/* Download App Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Download App</h3>
        <p className="mb-4">Save $3 with App New User Only</p>
        <div className="flex flex-col space-y-4">
          <a 
            href="#"
            className="flex items-center bg-primary border text-xs border-white text-white px-10 py-4 rounded hover:bg-gray-700 transition"
          >
            <FaApple className="mr-2 " /> Get on Apple
          </a>
          <a 
            href="#"
            className="flex items-center bg-primary border text-xs border-white text-white px-10 py-4 rounded hover:bg-gray-700 transition"
          >
            <FaGooglePlay className="mr-2" /> Get on Google Play
          </a>
        </div>
      </div>

    </div>

    <div className="container mx-auto px-8 text-xs md:px-16 text-center mt-8 text-[#7D8184]">
      <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
