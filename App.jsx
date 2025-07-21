import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';
import InventoryView from './components/InventoryView';
import AddItem from './components/AddItem';
import OwnerProfiles from './components/OwnerProfiles';
import SalesReport from './components/SalesReport';

export default function App() {
  const [tab, setTab] = useState('storefront');

  return (
    <div className="container mx-auto p-4">
      {tab === 'storefront' && <Storefront />}
      {tab === 'admin' && <AdminPanel />}
      {tab === 'inventory' && <InventoryView />}
      {tab === 'add' && <AddItem />}
      {tab === 'owners' && <OwnerProfiles />}
      {tab === 'sales' && <SalesReport />}

      <div className="flex space-x-2 mt-6">
        <button onClick={() => setTab('storefront')}>Storefront</button>
        <button onClick={() => setTab('admin')}>Admin</button>
        <button onClick={() => setTab('inventory')}>Inventory</button>
        <button onClick={() => setTab('add')}>Add Item</button>
        <button onClick={() => setTab('owners')}>Owners</button>
        <button onClick={() => setTab('sales')}>Sales</button>
      </div>
    </div>
  );
}