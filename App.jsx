import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import OwnerProfiles from './OwnerProfiles';
import SalesReports from './SalesReports';

export default function App() {
  const [currentTab, setCurrentTab] = useState('customer');
  const [subTab, setSubTab] = useState('main');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = () => {
    if (password === 'MaryPopp!ns1') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        {currentTab === 'customer' && (
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-2">Resale Charleston - Inventory</h1>
            <p className="text-gray-600">Come back soon, more items are loading.</p>
          </div>
        )}

        {currentTab === 'admin' && (
          <div className="p-4">
            {!authenticated ? (
              <div className="text-center">
                <input
                  type="password"
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  onClick={handlePasswordSubmit}
                  className="ml-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Login
                </button>
              </div>
            ) : (
              <>
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setSubTab('main')}
                    className={`px-3 py-1 rounded ${subTab === 'main' ? 'bg-emerald-600 text-white' : 'bg-gray-300'}`}
                  >
                    Admin Panel
                  </button>
                  <button
                    onClick={() => setSubTab('owners')}
                    className={`px-3 py-1 rounded ${subTab === 'owners' ? 'bg-emerald-600 text-white' : 'bg-gray-300'}`}
                  >
                    Owner Profiles
                  </button>
                  <button
                    onClick={() => setSubTab('sales')}
                    className={`px-3 py-1 rounded ${subTab === 'sales' ? 'bg-emerald-600 text-white' : 'bg-gray-300'}`}
                  >
                    Sales Reports
                  </button>
                </div>
                {subTab === 'main' && <AdminPanel />}
                {subTab === 'owners' && <OwnerProfiles />}
                {subTab === 'sales' && <SalesReports />}
              </>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-white shadow-inner flex justify-around py-2">
        <button
          onClick={() => setCurrentTab('customer')}
          className={`text-sm ${currentTab === 'customer' ? 'text-emerald-600 font-bold' : 'text-gray-600'}`}
        >
          Customer
        </button>
        <button
          onClick={() => setCurrentTab('admin')}
          className={`text-sm ${currentTab === 'admin' ? 'text-emerald-600 font-bold' : 'text-gray-600'}`}
        >
          Admin
        </button>
      </div>
    </div>
  );
}
