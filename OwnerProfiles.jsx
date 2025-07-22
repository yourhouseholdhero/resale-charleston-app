import React, { useState } from 'react';

export default function OwnerProfiles({ owners, onUpdateOwner, onDeleteOwner }) {
  const [editingOwnerId, setEditingOwnerId] = useState(null);
  const [editedOwner, setEditedOwner] = useState({});

  const handleEditClick = (owner) => {
    setEditingOwnerId(owner.id);
    setEditedOwner({ ...owner });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOwner({ ...editedOwner, [name]: value });
  };

  const handleSave = () => {
    onUpdateOwner(editedOwner);
    setEditingOwnerId(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Owner Profiles</h2>
      {owners.length === 0 ? (
        <p className="text-center text-gray-500">No owners added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {owners.map((owner) => (
            <div key={owner.id} className="border rounded-lg p-4 shadow-sm bg-white">
              {editingOwnerId === owner.id ? (
                <>
                  <div className="mb-2">
                    <label className="block font-medium">First Name</label>
                    <input name="firstName" value={editedOwner.firstName} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div className="mb-2">
                    <label className="block font-medium">Last Name</label>
                    <input name="lastName" value={editedOwner.lastName} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div className="mb-2">
                    <label className="block font-medium">Email</label>
                    <input name="email" value={editedOwner.email} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div className="mb-2">
                    <label className="block font-medium">Phone</label>
                    <input name="phone" value={editedOwner.phone} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Split %</label>
                    <input name="split" value={editedOwner.split} onChange={handleChange} type="number" min="0" max="100" className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div className="flex justify-between">
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
                    <button onClick={() => setEditingOwnerId(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p><span className="font-semibold">Name:</span> {owner.firstName} {owner.lastName}</p>
                  <p><span className="font-semibold">Email:</span> {owner.email}</p>
                  <p><span className="font-semibold">Phone:</span> {owner.phone}</p>
                  <p><span className="font-semibold">Split:</span> {owner.split}%</p>
                  <div className="mt-3 flex gap-4">
                    <button onClick={() => handleEditClick(owner)} className="bg-yellow-500 text-white px-4 py-1 rounded">Edit</button>
                    <button onClick={() => onDeleteOwner(owner.id)} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
