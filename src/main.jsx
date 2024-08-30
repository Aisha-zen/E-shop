import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/context/CartContext.jsx'
import { WishlistProvider } from './components/context/WishlistContext.jsx'
import { CheckoutProvider } from './components/context/CheckoutContext.jsx'
import { AuthProvider } from './components/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<CartProvider>
    <AuthProvider>
    <CheckoutProvider>
        <WishlistProvider>
          <App />
       </WishlistProvider>
    </CheckoutProvider>
    </AuthProvider>
    </CartProvider>
    </StrictMode>,
)
