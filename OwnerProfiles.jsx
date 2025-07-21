import React, { useState, useEffect } from 'react';

export default function OwnerProfiles() {
  const [owners, setOwners] = useState(() => {
    const saved = localStorage.getItem('owners');
    return saved ? JSON.parse(saved) : [
      { name: 'Alice Walker', contact: 'alice@example.com' },
      { name: 'Bob Jones', contact: 'bob@example.com' },
    ];
  });

  const [newOwner, setNewOwner] = useState({ name: '', contact: '' });

  // Save to localStorage every time owners update
  useEffect(() => {
    localStorage.setItem('owners', JSON.stringify(owners));
  }, [owners]);

  const handleChange = (index, field, value) => {
    const updated = [...owners];
    updated[index][field] = value;
    setOwners(updated);
  };

  const handleDelete = (index) => {
    setOwners(owners.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (newOwner.name.trim() && newOwner.contact.trim()) {
      setOwners([...owners, newOwner]);
      setNewOwner({ name: '', contact: '' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Owner Profiles</h2>

      <ul className="space-y-2 mb-4">
        {owners.map((owner, index) => (
          <li key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={owner.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <input
              type="email"
              value={owner.contact}
              onChange={(e) => handleChange(index, 'contact', e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button onClick={() => handleDelete(index)} className="text-red-600">🗑️</button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New owner name"
          value={newOwner.name}
          onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newOwner.contact}
          onChange={(e) => setNewOwner({ ...newOwner, contact: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
          ➕ Add
        </button>
      </div>
    </div>
  );
}
