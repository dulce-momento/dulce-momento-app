import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClientStore from './store/ClientStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      client: new ClientStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
