import React, { useState } from 'react';
import Storefront from './components/Storefront.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import InventoryView from './components/InventoryView.jsx';
import AddItem from './components/AddItem.jsx';
import OwnerProfiles from './components/OwnerProfiles.jsx';
import SalesReport from './components/SalesReport.jsx';

export default function App() {
  const [tab, setTab] = useState('storefront.jsx');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePassword = () => {
    const pw = prompt('Enter admin password');
    if (pw === 'admin123') setAuthenticated(true);
  };

  return (
    <div className="container">
      {tab === 'storefront' && <Storefront.jsx />}
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
