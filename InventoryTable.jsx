import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import OwnerProfiles from './OwnerProfiles';
import AddItem from './AddItem';
import SalesReport from './SalesReport';
import EditItem from './EditItem';

export default function AdminPanel({ inventory, setInventory, owners, setOwners }) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [editItemIndex, setEditItemIndex] = useState(null);

  const handleEdit = (index) => {
    setEditItemIndex(index);
  };

  const handleSaveEdit = (index, updatedItem) => {
    const newInventory = [...inventory];
    newInventory[index] = updatedItem;
    setInventory(newInventory);
    setEditItemIndex(null);
  };

  const handleCancelEdit = () => {
    setEditItemIndex(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex space-x-2 mb-4 justify-center">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('add')}
        >
          Add Item
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'owners' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('owners')}
        >
          Owner Profiles
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Report
        </button>
      </div>

      {activeTab === 'inventory' && (
        <InventoryTable
          inventory={inventory}
          setInventory={setInventory}
          onEdit={handleEdit}
        />
      )}
      {activeTab === 'add' && (
        <AddItem
          inventory={inventory}
          setInventory={setInventory}
          owners={owners}
        />
      )}
      {activeTab === 'owners' && (
        <OwnerProfiles
          owners={owners}
          setOwners={setOwners}
          inventory={inventory}
        />
      )}
      {activeTab === 'sales' && (
        <SalesReport inventory={inventory} />
      )}

      {editItemIndex !== null && (
        <EditItem
          item={inventory[editItemIndex]}
          index={editItemIndex}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
