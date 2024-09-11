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
  const [token, setToken] = useState(null); // Store token in state
  const dummyRecommendedProducts = [
    {  "id": 70,
      "title": " Polka Dot Midi Dress",
      "price": 79.99,
      "description": "Adorable polka dot midi dress, perfect for casual outings.",
      "category": "Fashion",
      "image": "/polka_dot_dress.png",
      "rating": {
        "rate": 4.8,
        "count": 65
      }
    },
    {
      "id": 68,
      "title": "Chanel No. 5 Perfume",
      "price": 299.99,
      "description": "Iconic fragrance with timeless elegance.",
      "category": "Beauty",
      "image": "/chanel_perfume.png",
      "rating": {
        "rate": 4.9,
        "count": 90
      }
    },
    {
      "id": 67,
      "title": "Pastel Phone Grip",
      "price": 12.99,
      "description": "Cute pastel-colored phone grip for better handling.",
      "category": "Phone Accessories",
      "image": "/pastel_phone_grip.png",
      "rating": {
        "rate": 4.4,
        "count": 120
      }
    },
    {
      "id": 66,
      "title": "Rose Gold  Earrings",
      "price": 29.99,
      "description": "Elegant rose gold hoop earrings for casual or formal wear.",
      "category": "Fashion",
      "image": "/rosegold_earrings.png",
      "rating": {
        "rate": 4.5,
        "count": 95
      }
    },
  ];
  

  useEffect(() => {
    const userToken = localStorage.getItem('token'); // Get the token from localStorage
    setToken(userToken); // Store token in state
    console.log("user token:", userToken);

    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch featured products
        const response = await axios.get(`${API_URL}/api/products`, {
          headers: { 'Accept': 'application/json' },
        });

        // Assuming that the API returns an array of products
        const products = response.data || [];
        setFeaturedProducts(products.slice(0, 25));

        // Fetch best sellers
        const bestSellersResponse = await axios.get(`${API_URL}/api/category/5/`, {
          headers: { 'Accept': 'application/json' },
        });
        setBestSellers(bestSellersResponse.data.slice(0,3) || []);
        console.log ('best:' , bestSellers)

        // // Fetch top fashion deals
        const topFashionDealsResponse = await axios.get(`${API_URL}/api/category/6/`, {
          headers: { 'Accept': 'application/json' },
        });
        setTopFashionDeals(topFashionDealsResponse.data.slice(0,3)|| []);
        console.log ('Top:', topFashionDeals)

        // // Fetch recommended products using recommender system (if user token exists)
        // if (userToken) {
        //   const userId = 'bfe76bef-8199-4d3b-a265-4891cf351028'; // Replace with actual user ID if available
        //   const recommendedResponse = await axios.get(`${API_URL}/api/recommend/${userId}/`, {
        //     headers: {
        //       Authorization: `Token ${userToken}`,
        //     },
        //   });
        //   setRecommendedProducts(recommendedResponse.data.recommended || []);
        // }
        // console.log('Recommended Products:', recommendedProducts);
        setRecommendedProducts(dummyRecommendedProducts);

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
        <Link to="/products" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">All</Link>
        <Link to="/category/3" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Electronics</Link>
        <Link to="/category/6" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Fashion</Link>
        <Link to="/category/1" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Men's Clothing</Link>
        <Link to="/category/2" className="text-gold hover:text-emerald-green px-2 py-1 rounded-xl">Women's Clothing</Link>
      </div>

      {/* Hero Section */}
      <HomeCarousel />

      {/* Recommended For You Section (Show only if the user has a token) */}
      {loading ? (
  <div className="text-center">Loading recommendations...</div>
) : (
  token && (
    <section className="mt-12 mx-auto px-4 py-4">
      <h2 className="text-4xl text-black font-semibold mb-4">Recommended for You</h2>
      <Carousel
        infinite
        autoPlay
        autoPlaySpeed={2000}
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
          tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
        }}
        showDots
      >
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map(product => (
            <div className="mx-4" key={product.id || product.name}>
            <ProductCard product={product} />
          </div>          ))
        ) : (
          <div>No recommendations available</div>
        )}
      </Carousel>
    </section>
  )
)}

 {/* Top Fashion Deals Section */}
 <section className="mt-5 mx-auto px-4 py-4">
        <Link to="/category/6">
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
        <Link to="/category/5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
