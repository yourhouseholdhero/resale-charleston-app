import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';

function App() {
  const [view, setView] = useState('landing');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'letmein') {
      setAdminUnlocked(true);
      setView('admin');
      setPassword('');
    } else {
      alert('Incorrect password.');
    }
  };

  const logout = () => {
    setAdminUnlocked(false);
    setView('landing');
  };

  const renderMenu = () => (
    <div className="absolute bg-white border shadow right-4 top-14 rounded z-50">
      <button
        onClick={() => {
          setView('storefront');
          setShowMenu(false);
        }}
        className="block px-6 py-3 text-left w-full hover:bg-gray-100"
      >
        Storefront
      </button>
      {!adminUnlocked && (
        <div className="p-4 border-t">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-3 py-1 w-full rounded"
          >
            Unlock Admin
          </button>
        </div>
      )}
      {adminUnlocked && (
        <>
          <button
            onClick={() => {
              setView('admin');
              setShowMenu(false);
            }}
            className="block px-6 py-3 text-left w-full hover:bg-gray-100"
          >
            Admin Panel
          </button>
          <button
            onClick={logout}
            className="block px-6 py-3 text-left w-full text-red-500 hover:bg-red-100"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-800 relative">
      {/* Nav */}
      <div className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Resale Charleston</h1>
        <button
          className="text-3xl px-2 py-1"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>
        {showMenu && renderMenu()}
      </div>

      {/* Page Content */}
      <div className="p-6">
        {view === 'landing' && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold">Welcome to Resale Charleston.</h2>
            <p className="mt-4">
              See our{' '}
              <button
                onClick={() => setView('storefront')}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Storefront here
              </button>
              .
            </p>
          </div>
        )}

        {view === 'storefront' && <Storefront />}
        {view === 'admin' && adminUnlocked && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;
