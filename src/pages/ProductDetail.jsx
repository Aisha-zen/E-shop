import React, { useState, useEffect } from 'react';
import '../App.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { FaStar } from 'react-icons/fa';
import productsData from '../data/product.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [flyerPosition, setFlyerPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const foundProduct = productsData.products.find((product) => product.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      const related = productsData.products.filter(
        (item) => item.category === foundProduct.category && item.id !== foundProduct.id
      );
      setRelatedProducts(related);
    } else {
      console.error('Product not found');
    }
  }, [id]);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-40 ">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold text-gray-800 mb-4">${product.price}</p>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-500">
              {Array.from({ length: Math.round(product.rating.rate) }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-gray-600 ml-2">({product.rating.count} reviews)</p>
          </div>

          <p className="text-lg text-gray-700 mb-6">{product.description}</p>

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

      {/* Animation Element */}
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
          <li>Category: {product.category}</li>
          {/* Add more specifications here */}
          <li>Weight: 500g</li>
          <li>Dimensions: 10x20x30 cm</li>
          <li>Material: High-quality plastic</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 ml-2">by John Doe</p>
              </div>
              <p className="text-gray-600">Great product, highly recommend!</p>
            </div>
          ))}
        </div>
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
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold">{relatedProduct.title}</h3>
              <p className="text-gray-800 font-semibold">${relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
