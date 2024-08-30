import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useCheckout } from '../components/context/CheckoutContext';


const PurchaseComplete = () => {
    const { totalAmount } = useCheckout();

  return (
    <div className="container mx-auto px-4 py-16  pt-[9rem] text-center ">
      <div className="flex justify-center mb-8">
        <FaCheckCircle className="text-green-500 text-7xl lg:text-9xl" />
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
        Purchase Complete!
      </h1>

      <p className="text-lg lg:text-xl text-gray-600 mb-12">
        Thank you for your purchase. Your order has been successfully placed.
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 mx-auto max-w-xl">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-700">
          Order Summary
        </h2>
        <p className="text-gray-600 mb-2">
          Order Number: <span className="font-semibold">#123456789</span>
        </p>
        <p className="text-gray-600 mb-6">
          Total Amount: <span className="font-semibold">${totalAmount}</span>
        </p>

        <hr className="border-t border-gray-200 mb-6" />

        <p className="text-gray-600">
          We've sent a confirmation email to <span className="font-semibold">your.email@example.com</span>.
        </p>
      </div>

      <div className="mt-12">
        <Link
          to="/"
          className="inline-block bg-gold text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-secondary-dark transition-colors mb-4 lg:mb-0 lg:mr-4"
        >
          Continue Shopping
        </Link>
        <Link
          to="/order"
          className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
        >
          View Order History
        </Link>
      </div>
    </div>
  );
};

export default PurchaseComplete;
