
import React, { useState } from 'react';
import AdminPanel from './AdminPanel';

export default function App() {
  const [currentTab, setCurrentTab] = useState('customer');

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
            <AdminPanel />
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
