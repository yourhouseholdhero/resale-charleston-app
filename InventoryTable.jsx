import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import Storefront from './Storefront';

export default function App() {
  const [activeTab, setActiveTab] = useState('storefront');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  const handleUnlock = (password) => {
    if (password === 'letmein') {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdminUnlocked(false);
    setActiveTab('storefront');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div>
          <button
            onClick={() => setActiveTab('storefront')}
            className={`px-3 py-2 mr-2 text-sm font-semibold rounded ${activeTab === 'storefront' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Storefront
          </button>
          {isAdminUnlocked ? (
            <>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 mr-2 text-sm font-semibold rounded ${activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Admin Panel
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <span className="inline-flex items-center gap-2">
              <input
                type="password"
                placeholder="Admin password"
                className="px-2 py-1 border rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUnlock(e.target.value);
                }}
              />
              <button
                onClick={() => handleUnlock(document.querySelector('input[type=password]').value)}
                className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded"
              >
                Unlock Admin
              </button>
            </span>
          )}
        </div>
      </nav>

      <main className="p-4">
        {activeTab === 'storefront' && <Storefront />}
        {activeTab === 'admin' && isAdminUnlocked && <AdminPanel />}
      </main>
    </div>
  );
}
