import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel.jsx';
import CustomerGallery from './components/CustomerGallery.jsx';
import OwnerProfiles from './components/OwnerProfiles.jsx';
import SalesReport from './components/SalesReport.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('storefront');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePassword = () => {
    const pw = prompt("Enter admin password:");
    if (pw === "MaryPopp!ns1") {
      setAuthenticated(true);
      setActiveTab('admin');
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <div>
      <div className="tab-bar">
        <button onClick={() => setActiveTab('storefront')}>Storefront</button>
        <button onClick={handlePassword}>Admin</button>
        {authenticated && (
          <>
            <button onClick={() => setActiveTab('inventory')}>Inventory</button>
            <button onClick={() => setActiveTab('owners')}>Owner Profiles</button>
            <button onClick={() => setActiveTab('sales')}>Sales Report</button>
          </>
        )}
      </div>
      {activeTab === 'storefront' && <CustomerGallery />}
      {activeTab === 'admin' && <AdminPanel />}
      {activeTab === 'inventory' && <AdminPanel />}
      {activeTab === 'owners' && <OwnerProfiles />}
      {activeTab === 'sales' && <SalesReport />}
    </div>
  );
}