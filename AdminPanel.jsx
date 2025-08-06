// src/components/AdminPanel.jsx

import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import AddItem from './AddItem';
import OwnerProfiles from './OwnerProfiles';
import AdminDashboard from './AdminDashboard';
import ExportCSV from './ExportCSV';

export default function AdminPanel({ isAdmin }) {
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  if (!isAdmin) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>🔒 Admin access required to view this panel.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-left mb-6">🛠️ Admin Control Panel</h2>

      <div className="flex justify-center mb-6 gap-2 flex-wrap">
        <button
          onClick={() => setSelectedTab('Dashboard')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'Dashboard'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setSelectedTab('Inventory')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'Inventory'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => setSelectedTab('AddItem')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'AddItem'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Add Item
        </button>
        <button
          onClick={() => setSelectedTab('OwnerProfiles')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'OwnerProfiles'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Owner Profiles
        </button>
      </div>

      <div className="bg-white rounded shadow p-6">
        {selectedTab === 'Dashboard' && <AdminDashboard />}
        {selectedTab === 'Inventory' && (
          <>
            <div className="flex justify-end mb-4">
              <ExportCSV />
            </div>
            <InventoryTable />
          </>
        )}
        {selectedTab === 'AddItem' && <AddItem />}
        {selectedTab === 'OwnerProfiles' && <OwnerProfiles />}
      </div>
    </div>
  );
}
