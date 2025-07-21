import React, { useState, useEffect } from 'react';
import Storefront from './Storefront';
import OwnerProfiles from './OwnerProfiles';

export default function App() {
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState('storefront');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    // Start on storefront tab
    setActiveTab('storefront');
  }, []);

  const handleLogin = () => {
    if (passwordInput === 'admin123') {
      setAdminUnlocked(true);
      setPasswordInput('');
    } else {
      alert('Wrong password!');
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'storefront':
        return <Storefront />;
      case 'ownerProfiles':
        return <OwnerProfiles />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('storefront')}>Storefront</button>
        {adminUnlocked && (
          <button onClick={() => setActiveTab('ownerProfiles')}>Owner Profiles</button>
        )}
      </div>

      {!adminUnlocked && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
          />
          <button onClick={handleLogin}>Unlock Admin</button>
        </div>
      )}

      <div>{renderTab()}</div>
    </div>
  );
}
