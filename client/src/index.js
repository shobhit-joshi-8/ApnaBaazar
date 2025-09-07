import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter >
        <AuthProvider>
            <SearchProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </SearchProvider>
        </AuthProvider>
    </BrowserRouter>

);

reportWebVitals();
