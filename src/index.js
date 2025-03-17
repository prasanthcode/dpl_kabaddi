import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Providers from './context/Providers';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Providers> 
        <App /> {/* ✅ App should NOT have <BrowserRouter> inside */}
      </Providers>
    
    
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
