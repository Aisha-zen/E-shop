import React, { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <CheckoutContext.Provider value={{ totalAmount, setTotalAmount }}>
      {children}
    </CheckoutContext.Provider>
  );
};
