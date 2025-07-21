import React from 'react';
import { FaStore, FaClipboardList, FaUserFriends, FaPlusCircle, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

export default function SidebarNav({ setActiveTab, handleLogout }) {
  const navItems = [
    { label: 'Storefront', icon: <FaStore />, tab: 'storefront' },
    { label: 'Inventory', icon: <FaClipboardList />, tab: 'inventory' },
    { label: 'Owner Profiles', icon: <FaUserFriends />, tab: 'ownerProfiles' },
    { label: 'Add Item', icon: <FaPlusCircle />, tab: 'addItem' },
    { label: 'Sales Report', icon: <FaChartBar />, tab: 'salesReport' },
  ];

  return (
    <div className="w-64 bg-emerald-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Menu</h2>
      <ul className="space-y-4">
        {navItems.map(({ label, icon, tab }) => (
          <li
            key={tab}
            className="flex items-center gap-3 p-2 hover:bg-emerald-800 rounded cursor-pointer"
            onClick={() => setActiveTab(tab)}
          >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-10 flex items-center gap-2 p-2 w-full bg-red-600 hover:bg-red-700 rounded text-white"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
