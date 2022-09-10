import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import HomeCarousel from './HomeCarousel';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = ({ userToken }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [topFashionDeals, setTopFashionDeals] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token'); // Get the token from localStorage
    console.log("user token:", userToken)
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch recommended products
        // const recommendedResponse = await axios.get('/api/recommendations', {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // });
        // setRecommendedProducts(recommendedResponse.data.recommended || []);

        // Fetch featured products
        const featuredResponse = await axios.get(`${API_URL}/api/products/`, {
          headers: {
            Authorization: `Token ${userToken}`, // Ensure you're passing the correct token
              'Accept': 'application/json'
            
          },
        });
        
        setFeaturedProducts(featuredResponse.data.featured || []);
        console.log(localStorage.getItem('token'));  // or sessionStorage.getItem('token')


        // Fetch best sellers
        // const bestSellersResponse = await axios.get('/api/products/best-sellers', {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // });
        // setBestSellers(bestSellersResponse.data.bestSellers || []);

        // // Fetch top fashion deals
        // const topFashionDealsResponse = await axios.get('/api/products/top-fashion-deals', {
        //   headers: {
        //     Authorization: `Bearer ${userToken}`,
        //   },
        // });
        // setTopFashionDeals(topFashionDealsResponse.data.topFashionDeals || []);

        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userToken]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="mt-[5rem]">
      {/* Bottom Navigation Links */}
      <div className="hidden md:flex items-center justify-center bg-primary text-white p-5 space-x-8">
        <Link to="/" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">All</Link>
        <Link to="/category/Electronics" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Electronics</Link>
        <Link to="/category/Fashion" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Fashion</Link>
        <Link to="/category/Men" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Men's Clothing</Link>
        <Link to="/category/Women" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Women's Clothing</Link>
      </div>

      {/* Hero Section */}
      <HomeCarousel />

      {/* Recommended For You Section */}
      <section className="mt-12 mx-auto px-4 py-4">
        <h2 className="text-4xl text-black font-semibold mb-4">Recommended for You</h2>
        <Carousel
          infinite
          autoPlay
          autoPlaySpeed={3000}
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
          }}
          showDots
        >
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div>No recommendations available</div>
          )}
        </Carousel>
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
      </section>

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
