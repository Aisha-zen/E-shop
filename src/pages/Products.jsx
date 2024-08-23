import React, { useState, useEffect } from 'react';
// Import your local JSON file
import productsData from '../data/product.json';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    // Use the local JSON data instead of fetching from an API
    try {
      setProducts(productsData.products); // Assuming your JSON has a "products" array
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  }, []);

  // Sort products based on the selected sorting option
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
