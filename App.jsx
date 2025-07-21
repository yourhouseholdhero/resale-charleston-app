import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';
import InventoryView from './components/InventoryView';
import AddItem from './components/AddItem';
import OwnerProfiles from './components/OwnerProfiles';
import SalesReport from './components/SalesReport';

export default function App() {
  const [tab, setTab] = useState('storefront');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePassword = () => {
    const pw = prompt('Enter admin password');
    if (pw === 'admin123') setAuthenticated(true);
  };

  return (
    <div className="container">
      {tab === 'storefront' && <Storefront />}
      {tab === 'admin' && !authenticated && (
        <button onClick={handlePassword}>Enter Admin Area</button>
      )}
      {tab === 'admin' && authenticated && (
        <>
          <InventoryView />
          <AddItem />
          <OwnerProfiles />
          <SalesReport />
        </>
      )}
      <div className="tab-bar">
        <button onClick={() => setTab('storefront')}>Storefront</button>
        <button onClick={() => setTab('admin')}>Admin</button>
      </div>
    </div>
  );
}
