import React, { useState } from 'react';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [tab, setTab] = useState('storefront');
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="container">
      {tab === 'storefront' && <Storefront />}
      {tab === 'admin' && !authenticated && (
        <div>
          <p>Enter Admin Password</p>
          <input type="password" onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value === 'resalechs') {
              setAuthenticated(true);
            }
          }} />
        </div>
      )}
      {tab === 'admin' && authenticated && <AdminPanel />}

      <div className="tab-bar">
        <button onClick={() => setTab('storefront')}>Storefront</button>
        <button onClick={() => setTab('admin')}>Admin</button>
      </div>
    </div>
  );
}
