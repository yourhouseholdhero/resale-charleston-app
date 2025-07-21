import React, { useState } from 'react';
import Storefront from './Storefront.jsx';
import AdminPanel from './AdminPanel.jsx';
import OwnerProfiles from './OwnerProfiles.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('storefront');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [password, setPassword] = useState('');

  const handleUnlock = () => {
    if (password === 'resale123') {
      setAdminUnlocked(true);
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

        {!adminUnlocked ? (
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={handleUnlock}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Unlock Admin
            </button>
          </div>
        ) : (
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
