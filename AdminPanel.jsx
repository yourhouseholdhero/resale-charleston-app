import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import OwnerProfiles from './OwnerProfiles';
import SalesReport from './SalesReport';
import Inventory from './Inventory';

export default function AdminPanel({ inventory, setInventory, ownerProfiles, setOwnerProfiles }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Add Item');

  const handleLogin = () => {
    if (password === 'MaryPopp!ns1') {
      setIsAdmin(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return (
      <div className="p-6 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>

      <div className="flex space-x-2 mb-4">
        {['Add Item', 'Inventory', 'Owner Profiles', 'Sales Report'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'Add Item' && (
          <AddItem inventory={inventory} setInventory={setInventory} ownerProfiles={ownerProfiles} />
        )}
        {activeTab === 'Inventory' && (
          <Inventory inventory={inventory} setInventory={setInventory} />
        )}
        {activeTab === 'Owner Profiles' && (
          <OwnerProfiles ownerProfiles={ownerProfiles} setOwnerProfiles={setOwnerProfiles} />
        )}
        {activeTab === 'Sales Report' && (
          <SalesReport inventory={inventory} ownerProfiles={ownerProfiles} />
        )}
      </div>
    </div>
  );
}
