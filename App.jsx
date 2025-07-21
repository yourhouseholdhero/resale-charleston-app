import React, { useState } from 'react';
import AdminPanel from './AdminPanel.jsx';
import Storefront from './Storefront.jsx';

function App() {
  const [tab, setTab] = useState('storefront');

  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center mt-4">Resale Charleston Admin Dashboard</h1>
      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={() => setTab('storefront')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Storefront
        </button>
        <button onClick={() => setTab('admin')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Admin Panel
        </button>
      </div>
      <div className="mt-8">
        {tab === 'storefront' && <Storefront />}
        {tab === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;
