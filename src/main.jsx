import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/context/CartContext.jsx'
import { WishlistProvider } from './components/context/WishListContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
        <WishlistProvider>
    <App />
    </WishlistProvider>
    </CartProvider>

  </StrictMode>,
)
