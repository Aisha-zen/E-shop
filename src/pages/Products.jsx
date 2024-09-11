import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const API_URL = import.meta.env.VITE_API_URL; // Load base API URL from environment variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    const userToken = localStorage.getItem('token'); // Get the token from localStorage
    console.log("user token:", userToken);
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized: Please provide valid authentication credentials.');
        } else {
          setError('Failed to load products');
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    if (sortBy === 'rating') {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-[6rem]">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="flex justify-between items-center mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
