import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory to useNavigate

const PaymentDetails = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    paypalEmail: ''
  });

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    const cardNumberRegex = /^\d{16}$/;
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cardCVCRegex = /^\d{3}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (paymentMethod === 'credit-card') {
      if (!cardNumberRegex.test(paymentData.cardNumber)) {
        formErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!cardExpiryRegex.test(paymentData.cardExpiry)) {
        formErrors.cardExpiry = 'Expiry date must be in MM/YY format';
      }
      if (!cardCVCRegex.test(paymentData.cardCVC)) {
        formErrors.cardCVC = 'CVC must be 3 digits';
      }
    }

    if (paymentMethod === 'paypal' && !emailRegex.test(paymentData.paypalEmail)) {
      formErrors.paypalEmail = 'Please enter a valid PayPal email';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      // Simulate payment processing
      setTimeout(() => {
        console.log('Processing payment with data:', paymentData);
        setLoading(false);
        // On successful payment, navigate to the Purchase Complete page
        navigate('/complete'); // Updated from history.push to navigate
      }, 2000); // Simulated delay
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">Payment Details</h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentMethod === 'credit-card' && (
            <>
              <div>
                <label className="block mb-2 font-medium">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9101 1121"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-primary ${
                    errors.cardNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={paymentData.cardExpiry}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:border-primary ${
                      errors.cardExpiry ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                </div>
                <div>
                  <label className="block mb-2 font-medium">CVC</label>
                  <input
                    type="text"
                    name="cardCVC"
                    placeholder="123"
                    value={paymentData.cardCVC}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:border-primary ${
                      errors.cardCVC ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.cardCVC && <p className="text-red-500 text-sm mt-1">{errors.cardCVC}</p>}
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'paypal' && (
            <div>
              <label className="block mb-2 font-medium">PayPal Email</label>
              <input
                type="email"
                name="paypalEmail"
                placeholder="you@example.com"
                value={paymentData.paypalEmail}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-primary ${
                  errors.paypalEmail ? 'border-red-500' : ''
                }`}
              />
              {errors.paypalEmail && <p className="text-red-500 text-sm mt-1">{errors.paypalEmail}</p>}
            </div>
          )}

          <button
            type="submit"
            className={`w-full bg-gold text-white px-4 py-3 rounded-lg transition-colors ${
              loading ? 'bg-opacity-75 cursor-not-allowed' : 'hover:bg-secondary-dark'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : 'Complete Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
