import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const API_URL = import.meta.env.VITE_API_URL; // Load base API URL from environment variables
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch category products from API
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products based on category from API
        const response = await fetch(`${API_URL}/api/category/${categoryName}`);
        const data = await response.json();

        if (response.ok) {
          // Check if data contains products array, else set an empty array
          setFilteredProducts(data|| []);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const productCount = filteredProducts.length;

  return (
    <div className="container my-[7rem] mx-auto mt-40 lg:mt-[8rem]">
       <h2 className="lg:text-3xl text-2xl font-bold mb-4 mx-10">
        {formattedCategoryName} Products ({productCount} {productCount === 1 ? 'product' : 'products'})
      </h2>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-10 pt-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center col-span-3">No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
