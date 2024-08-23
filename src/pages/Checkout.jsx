import React, { useState } from 'react';
import { useCart } from '../components/context/CartContext'; // Ensure you have access to cartItems here

const Checkout = () => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'credit-card',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement checkout functionality here
    console.log('Submitting checkout with data:', formData);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cart Summary */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">x{item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-lg">Your cart is empty.</p>
          )}
          <div className="border-t pt-4 mt-4 flex justify-between">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">${calculateTotal()}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-white px-4 py-3 rounded-lg hover:bg-secondary-dark transition-colors"
            >
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
