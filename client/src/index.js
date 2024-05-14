import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClientStore from './store/ClientStore';
import ProductStore from './store/ProductStore';
import CartStore from './store/CartStore';
import RatingStore from './store/RatingStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      client: new ClientStore(),
      product: new ProductStore(),
      cart: new CartStore(),
      curRating: new RatingStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
