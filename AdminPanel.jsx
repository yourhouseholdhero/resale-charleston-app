import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import AddItem from './AddItem';
import OwnerProfiles from './OwnerProfiles';

export default function AdminPanel({ isAdmin }) {
  const [selectedTab, setSelectedTab] = useState('inventory');

  if (!isAdmin) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p>🔒 Admin access required to view this panel.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">🛠️ Admin Control Panel</h2>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedTab('inventory')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'inventory'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => setSelectedTab('addItem')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'addItem'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Add Item
        </button>
        <button
          onClick={() => setSelectedTab('ownerProfiles')}
          className={`px-4 py-2 rounded-md ${
            selectedTab === 'ownerProfiles'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Owner Profiles
        </button>
      </div>

      <div className="bg-white rounded shadow p-6">
        {selectedTab === 'inventory' && <InventoryTable />}
        {selectedTab === 'addItem' && <AddItem />}
        {selectedTab === 'ownerProfiles' && <OwnerProfiles />}
      </div>
    </div>
  );
}
