import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products'); // Adjust the API endpoint and limit as needed
        // const response = await axios.get('https://fakestoreapi.com/products?limit=12'); // Adjust the API endpoint and limit as needed
        setFeaturedProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mt-[4rem]">
      {/* Bottom Navigation Links */}
      <div className="hidden md:flex items-center justify-center bg-primary text-white p-5 space-x-8">
      <Link to="/" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">All</Link>
      <Link to="/category/electronics" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Electronics</Link>
      <Link to="/category/jewelery" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Jewelery</Link>
      <Link to="/category/men's-clothing" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Men's Clothing</Link>
      <Link to="/category/women's-clothing" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Women's Clothing</Link>
      </div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-no-repeat bg-center h-[60vh] text-white flex items-center justify-center"
               style={{ backgroundImage: "url('/assets/hero-image.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Deals!</h1>
          <p className="text-lg md:text-2xl mb-6">Explore our top products and latest collections at unbeatable prices.</p>
          <a href="/shop" className="bg-gold text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-secondary transition duration-300">Shop Now</a>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mt-12  mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
