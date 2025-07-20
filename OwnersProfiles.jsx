import React, { useState, useEffect } from 'react';

export default function OwnerProfiles() {
  const [owners, setOwners] = useState(() => {
    const stored = localStorage.getItem('rc_owners');
    return stored ? JSON.parse(stored) : [];
  });
  const [form, setForm] = useState({ name: '', address: '', phone: '', split: '' });

  useEffect(() => {
    localStorage.setItem('rc_owners', JSON.stringify(owners));
  }, [owners]);

  const addOwner = () => {
    if (!form.name || !form.split) return alert('Name and split required');
    setOwners([...owners, { ...form, id: Date.now(), items: [], paid: 0 }]);
    setForm({ name: '', address: '', phone: '', split: '' });
  };

  const updateOwner = (id, field, value) => {
    setOwners(owners.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const deleteOwner = (id) => {
    if (window.confirm('Delete this owner?')) {
      setOwners(owners.filter(o => o.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Owner Profiles</h2>

      <div className="bg-white shadow p-4 rounded mb-6">
        <input className="border p-2 w-full mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 w-full mb-2" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input className="border p-2 w-full mb-2" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="border p-2 w-full mb-2" placeholder="Percent Split (e.g. 50)" value={form.split} onChange={e => setForm({ ...form, split: e.target.value })} />
        <button onClick={addOwner} className="bg-indigo-600 text-white py-2 px-4 rounded">Add Owner</button>
      </div>

      {owners.length === 0 ? (
        <p className="text-gray-600">No owners added yet.</p>
      ) : (
        owners.map(owner => (
          <div key={owner.id} className="bg-white p-4 rounded shadow mb-4">
            <div className="text-lg font-semibold">{owner.name}</div>
            <div className="text-sm text-gray-600">Split: {owner.split}% | Phone: {owner.phone}</div>
            <div className="text-sm text-gray-600 mb-2">Address: {owner.address}</div>
            <input className="border p-1 w-full mb-2" value={owner.name} onChange={e => updateOwner(owner.id, 'name', e.target.value)} />
            <input className="border p-1 w-full mb-2" value={owner.address} onChange={e => updateOwner(owner.id, 'address', e.target.value)} />
            <input className="border p-1 w-full mb-2" value={owner.phone} onChange={e => updateOwner(owner.id, 'phone', e.target.value)} />
            <input className="border p-1 w-full mb-2" value={owner.split} onChange={e => updateOwner(owner.id, 'split', e.target.value)} />
            <button onClick={() => deleteOwner(owner.id)} className="text-red-600 text-sm">Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
