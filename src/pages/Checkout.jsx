import React, { useState } from 'react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'credit-card'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement checkout functionality here
    console.log("Submitting checkout with data:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-40">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <div>
          <label className="block mb-2">Payment Method</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="p-2 border rounded w-full"
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
