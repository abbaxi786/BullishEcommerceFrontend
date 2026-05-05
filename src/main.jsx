import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from './function/context.jsx';
import { NotificationProvider } from './function/notification.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
    <CartProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartProvider>
    </NotificationProvider>
  </StrictMode>,
)
