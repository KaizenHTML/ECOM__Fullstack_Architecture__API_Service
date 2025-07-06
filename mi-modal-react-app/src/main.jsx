// src/main.jsx o src/index.js de tu app React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // O el nombre de tu componente principal

const container = document.getElementById('react-login-modal-root'); // <-- Usa el mismo ID aquí
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);