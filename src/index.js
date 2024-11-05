import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStateProvider } from './config/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStateProvider>
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </GlobalStateProvider>
);