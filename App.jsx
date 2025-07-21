import React, { useState } from 'react';
import Storefront from './Storefront.jsx';
import AdminPanel from './AdminPanel.jsx';
import OwnerProfiles from './OwnerProfiles.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('storefront');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = () => {
    if (password === 'resale123') {
      setAdminUnlocked(true);
      setIsLoggingIn(false);
      setPassword('');
      setCurrentTab('admin');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setAdminUnlocked(false);
    setPassword('');
    setCurrentTab('storefront');
  };

  return (
    <div className="p-6">
      <nav className="flex flex-wrap gap-4 items-center mb-6">
        <button
          onClick={() => setCurrentTab('storefront')}
          className="underline text-blue-700"
        >
          Storefront
        </button>

        {!adminUnlocked && !isLoggingIn && (
          <button
            onClick={() => setIsLoggingIn(true)}
            className="underline text-blue-700"
          >
            Admin Login
          </button>
        )}

        {isLoggingIn && !adminUnlocked && (
          <div className="flex gap-2 items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={handlePasswordSubmit}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Submit
            </button>
          </div>
        )}

        {adminUnlocked && (
          <>
            <button
              onClick={() => setCurrentTab('admin')}
              className="underline text-blue-700"
            >
              Admin Panel
            </button>
            <button
              onClick={() => setCurrentTab('owners')}
              className="underline text-blue-700"
            >
              Owner Profiles
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 border px-2 py-1 border-red-600 rounded"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <main>
        {currentTab === 'storefront' && <Storefront />}
        {currentTab === 'admin' && adminUnlocked && <AdminPanel />}
        {currentTab === 'owners' && adminUnlocked && <OwnerProfiles />}
      </main>
    </div>
  );
}
