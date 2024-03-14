import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from './Login.jsx'; // Import your Login component
import './index.css';

// Check if the user is logged in or not
const isLoggedIn = localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Render the Login component if the user is not logged in */}
    {!isLoggedIn && <Login />}
    {/* Render the App component if the user is logged in */}
    {isLoggedIn && <App />}
  </React.StrictMode>,
);
