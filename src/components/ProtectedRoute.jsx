import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Check if token exists in local storage
  };

  return isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
