import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import productsData from '../data/product.json';
import HomeCarousel from './HomeCarousel';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [topFashionDeals, setTopFashionDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate loading with a timeout
      setTimeout(() => {
        // Use the imported data directly
        setFeaturedProducts(productsData.products.slice(0, 25));
        setBestSellers(productsData.products.filter(product => product.category === "Best").slice(0, 3));
        setTopFashionDeals(productsData.products.filter(product => product.category === "Top").slice(0, 3));
        setLoading(false);
      }, 500); // Adjust the timeout duration as needed
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mt-[4rem]">
      {/* Bottom Navigation Links */}
      <div className="hidden md:flex items-center justify-center bg-primary text-white p-5 space-x-8">
        <Link to="/" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">All</Link>
        {/* <Link to="/category/Best" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Best Seller</Link> */}
        <Link to="/category/Electronics" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Electronics</Link>
        <Link to="/category/Fashion" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Fashion</Link>
        <Link to="/category/Men" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Men's Clothing</Link>
        <Link to="/category/Women" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Women's Clothing</Link>
      </div>
      
      {/* Hero Section */}
     <HomeCarousel/>

      {/* Best Sellers Section */}
      <section className="mt-12 mx-auto px-4 py-4">
      <Link to="/category/Best">
        <h2 className="text-4xl text-black font-semibold mb-4">Best Sellers</h2>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* <div className="text-center my-10">
          <Link to="/category/Best" className="text-white hover:bg-charcoal-gray transition duration-300 bg-gold py-3 px-6 rounded-lg">See More</Link>
        </div> */}
      </section>

        {/* Top Fashion Deals Section */}
        <section className="mt-5 mx-auto px-4 py-4">
          <Link to="/category/Top">
        <h2 className="text-4xl text-black font-semibold mb-4">Top Fashion Deals</h2>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {topFashionDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* <div className="text-center mt-10">
          <Link to="/category/Top" className="text-white hover:bg-charcoal-gray transition duration-300 bg-gold py-3 px-6 rounded-lg">See More</Link>
        </div> */}
      </section>

      {/* Featured Products Section */}
      <section className="mt-5 mx-auto px-4 py-4">
        <h2 className="text-4xl text-black font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center my-10">
          <Link to="/products" className="text-white hover:bg-charcoal-gray transition duration-300 bg-gold py-3 px-6 rounded-lg">See More</Link>
        </div>
      </section>

      

    
    </div>
  );
};

export default Home;
