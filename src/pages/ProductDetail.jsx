import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ProductDetail = ({ userToken }) => {
  const API_URL = import.meta.env.VITE_API_URL; // Load base API URL from environment variables
  const { id } = useParams(); // Getting product ID from the route
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [flyerPosition, setFlyerPosition] = useState({ top: 0, left: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Fetching the product detail by ID
        const response = await axios.get(`${API_URL}/api/product/${id}/`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Product Data:', response.data); // Logging product data
        const productData = response.data;
        setProduct(productData);

        // Fetch related products based on category (assuming API provides this info)
      // Fetch related products based on product category from backend if possible

// const relatedResponse = await axios.get(`${API_URL}/api/product/related/${productData.category}`);

//         const allProducts = relatedResponse.data.products;
//         const related = allProducts.filter(
//           (item) => item.category === productData.category && item.id !== productData.id
//         );
//         setRelatedProducts(related);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, userToken]);

  const handleAddToCart = (event) => {
    const { top, left } = event.target.getBoundingClientRect();
    setFlyerPosition({ top, left });
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      addToCart({ ...product, quantity });
    }, 1000); // Animation duration
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleRelatedProductClick = (relatedProductId) => {
    navigate(`/products/${relatedProductId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-40">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src={product?.image} // Fallback to default image if not available
              alt={product?.title}
              className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          <p className="text-xl font-semibold text-gray-800 mb-4">${product?.price}</p>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-500">
              {Array.from({ length: Math.round(product?.rating?.rate) }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-gray-600 ml-2">({product?.rating?.count} reviews)</p>
          </div>

          <p className="text-lg text-gray-700 mb-6">{product?.description }</p>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-lg font-semibold">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className="w-16 p-2 border rounded-lg text-lg text-center"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-secondary text-white text-lg font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-secondary-dark transition-colors duration-300 relative overflow-hidden"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {isAnimating && (
        <div
          className="fixed z-50 w-16 h-16 bg-secondary rounded-full transition-transform duration-200 ease-in-out"
          style={{
            top: `${flyerPosition.top}px`,
            left: `${flyerPosition.left}px`,
            transform: 'translate(-50%, -50%) scale(0.5)',
            animation: 'flyToCart 1s forwards',
          }}
        />
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Category: {product?.category || 'N/A'}</li>
          <li>Weight: 500g</li>
          <li>Dimensions: 10x20x30 cm</li>
          <li>Material: High-quality plastic</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleRelatedProductClick(relatedProduct.id)}
            >
              <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
                <img
                  src={relatedProduct.image || 'default-image-url'}
                  alt={relatedProduct.title || 'Product Image'}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold">{relatedProduct.title || 'No Title'}</h3>
              <p className="text-gray-800 font-semibold">${relatedProduct.price || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
