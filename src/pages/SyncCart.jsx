import axios from 'axios';

const syncCart = async (cartItems) => {
  const token = localStorage.getItem('token'); // Assume the token is stored in localStorage
  try {
    const response = await axios.post('/cart/sync', { cart: cartItems }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to sync cart:', error);
  }
};
