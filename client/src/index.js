import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter >
        <AuthProvider>
            <SearchProvider>
                <CartProvider>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </CartProvider>
            </SearchProvider>
        </AuthProvider>
    </BrowserRouter>

);

reportWebVitals();
