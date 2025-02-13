import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './store/CartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <App />
  </CartProvider>
);
