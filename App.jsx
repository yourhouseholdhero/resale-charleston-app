import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [view, setView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePasswordCheck = () => {
    const password = prompt('Enter admin password:');
    if (password === 'MaryPopp!ns1') {
      setIsAuthenticated(true);
      setView('admin');
    } else {
      alert('Incorrect password');
    }
  };

  const renderContent = () => {
    if (view === 'storefront') return <Storefront />;
    if (view === 'admin' && isAuthenticated) return <AdminPanel />;
    return (
      <div className="landing">
        <h1>Welcome to Resale Charleston.</h1>
        <p>
          See our{' '}
          <span
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => setView('storefront')}
          >
            Storefront here
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="top-nav">
        <div className="hamburger" onClick={() => setShowDropdown(!showDropdown)}>
          &#9776;
        </div>
        {showDropdown && (
          <div className="dropdown">
            <p onClick={() => setView('storefront')}>Storefront</p>
            <p onClick={handlePasswordCheck}>Admin Login</p>
          </div>
        )}
      </div>
      {renderContent()}
    </div>
  );
}
