import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');

  const correctPassword = 'resale2024'; // 👈 Change this to your real password

  const handleLogin = () => {
    if (password === correctPassword) {
      setAdminUnlocked(true);
      setShowPasswordPrompt(false);
      setPassword('');
      setPage('admin');
    } else {
      alert('Incorrect password');
    }
  };

  const renderContent = () => {
    if (page === 'storefront') return <Storefront />;
    if (page === 'admin' && adminUnlocked) return <AdminPanel />;
    return (
      <div className="landing">
        <h1>Welcome to Resale Charleston</h1>
        <p>
          See our Storefront <button onClick={() => setPage('storefront')} style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>here</button>.
        </p>
      </div>
    );
  };

  return (
    <div className="App" style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '20px' }}>
      {/* Hamburger Menu */}
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ☰
        </button>
        {menuOpen && (
          <div style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginTop: '8px' }}>
            <div style={{ marginBottom: '8px', cursor: 'pointer' }} onClick={() => { setPage('storefront'); setMenuOpen(false); }}>Storefront</div>
            {!adminUnlocked && (
              <div style={{ cursor: 'pointer' }} onClick={() => { setShowPasswordPrompt(true); setMenuOpen(false); }}>Admin Login</div>
            )}
            {adminUnlocked && (
              <div style={{ cursor: 'pointer' }} onClick={() => { setPage('admin'); setMenuOpen(false); }}>Admin Panel</div>
            )}
          </div>
        )}
      </div>

      {/* Password Prompt */}
      {showPasswordPrompt && (
        <div style={{ marginTop: '30px' }}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          />
          <button onClick={handleLogin} style={{ padding: '8px 16px', marginLeft: '10px', fontSize: '16px' }}>Unlock</button>
        </div>
      )}

      {/* Main Content */}
      <div style={{ marginTop: '80px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
