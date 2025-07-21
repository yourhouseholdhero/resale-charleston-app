import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import AddItem from './AddItem';
import OwnerProfiles from './OwnerProfiles';
import SalesReport from './SalesReport';

export default function AdminPanel({ inventory, markAsSold, addItem }) {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div>
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('add')}
        >
          Add Item
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'owners' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('owners')}
        >
          Owner Profiles
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Report
        </button>
      </div>

      {activeTab === 'inventory' && <InventoryTable inventory={inventory} markAsSold={markAsSold} />}
      {activeTab === 'add' && <AddItem addItem={addItem} />}
      {activeTab === 'owners' && <OwnerProfiles />}
      {activeTab === 'sales' && <SalesReport inventory={inventory} />}
    </div>
  );
}
