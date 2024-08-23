import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/product.json';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Filter products based on category
      const categoryProducts = productsData.products.filter(product => 
        product.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredProducts(categoryProducts);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container my-[7rem] mx-auto mt-40 lg:mt-[8rem]">
      <h2 className="lg:text-3xl text-2xl font-bold mb-4 mx-10">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</h2>
      <hr></hr>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-10 pt-10">
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center">No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
