// src/components/AdminPanel.jsx
import React, { useState } from 'react';
import { FaBoxOpen, FaPlus, FaUsers, FaChartLine, FaBars } from 'react-icons/fa';
import Inventory from './Inventory';
import AddItem from './AddItem';
import OwnerProfiles from './OwnerProfiles';
import SalesReport from './SalesReport';

export default function AdminPanel({ inventory, setInventory, owners, setOwners }) {
  const [tab, setTab] = useState('inventory');
  const [collapsed, setCollapsed] = useState(false);

  const renderTab = () => {
    switch (tab) {
      case 'inventory':
        return <Inventory inventory={inventory} setInventory={setInventory} owners={owners} />;
      case 'add':
        return <AddItem setInventory={setInventory} owners={owners} />;
      case 'owners':
        return <OwnerProfiles owners={owners} setOwners={setOwners} inventory={inventory} />;
      case 'sales':
        return <SalesReport inventory={inventory} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className={`bg-gray-800 text-white transition-all ${collapsed ? 'w-16' : 'w-48'} flex flex-col`}>
        <button className="p-4 hover:bg-gray-700" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
        <button className="p-4 flex items-center hover:bg-gray-700" onClick={() => setTab('inventory')}>
          <FaBoxOpen className="mr-2" /> {!collapsed && 'Inventory'}
        </button>
        <button className="p-4 flex items-center hover:bg-gray-700" onClick={() => setTab('add')}>
          <FaPlus className="mr-2" /> {!collapsed && 'Add Item'}
        </button>
        <button className="p-4 flex items-center hover:bg-gray-700" onClick={() => setTab('owners')}>
          <FaUsers className="mr-2" /> {!collapsed && 'Owner Profiles'}
        </button>
        <button className="p-4 flex items-center hover:bg-gray-700" onClick={() => setTab('sales')}>
          <FaChartLine className="mr-2" /> {!collapsed && 'Sales Report'}
        </button>
      </div>
      <div className="flex-1 p-6">{renderTab()}</div>
    </div>
  );
}
