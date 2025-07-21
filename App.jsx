import React from 'react';
import AdminPanel from './components/AdminPanel.jsx';
import Storefront from './components/Storefront.jsx';
import OwnerProfiles from './components/OwnerProfiles.jsx';

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center mt-4">Resale Charleston Admin Dashboard</h1>
      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={() => setTab('admin')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Admin Panel</button>
        <button onClick={() => setTab('storefront')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Storefront</button>
        <button onClick={() => setTab('owners')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Owner Profiles</button>
      </div>
      <div className="mt-8">
        {tab === 'admin' && <AdminPanel />}
        {tab === 'storefront' && <Storefront />}
        {tab === 'owners' && <OwnerProfiles />}
      </div>
    </div>
  );
}

export default App;
