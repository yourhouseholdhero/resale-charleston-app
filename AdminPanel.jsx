import React, { useState } from 'react';
import InventoryView from './InventoryView.jsx';
import EditItemPanel from './EditItemPanel.jsx';
import ExportData from './ExportData.jsx';
import SalesReport from './SalesReport.jsx';
import LabelGenerator from './LabelGenerator.jsx';
import PaymentOptions from './PaymentOptions.jsx';
import OwnerProfiles from './OwnerProfiles.jsx';

function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'ResaleCHS') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="p-4">
      {!authenticated ? (
        <div className="flex flex-col items-center">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded mb-2"
          />
          <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <InventoryView />
          <EditItemPanel />
          <ExportData />
          <SalesReport />
          <LabelGenerator />
          <PaymentOptions />
          <OwnerProfiles />
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
