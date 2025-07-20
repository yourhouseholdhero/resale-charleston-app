import React, { useState } from 'react';
import InventoryView from './InventoryView';
import AddItem from './AddItem';
import OwnerProfiles from './OwnerProfiles';
import SalesReport from './SalesReport';

export default function App() {
  const [tab, setTab] = useState('inventory');

  return (
    <div className="container">
      {tab === 'inventory' && <InventoryView />}
      {tab === 'add' && <AddItem />}
      {tab === 'owners' && <OwnerProfiles />}
      {tab === 'sales' && <SalesReport />}

      <div className="tab-bar">
        <button onClick={() => setTab('inventory')}>Inventory</button>
        <button onClick={() => setTab('add')}>Add Item</button>
        <button onClick={() => setTab('owners')}>Owners</button>
        <button onClick={() => setTab('sales')}>Sales</button>
      </div>
    </div>
  );
}