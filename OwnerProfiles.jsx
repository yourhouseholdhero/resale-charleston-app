import React, { useState } from 'react';

export default function OwnerProfiles({ owners = [], onUpdateOwner, onDeleteOwner, onAddOwner }) {
  const [editingOwnerId, setEditingOwnerId] = useState(null);
  const [editedOwner, setEditedOwner] = useState({});
  const [addingOwner, setAddingOwner] = useState(false);
  const [newOwner, setNewOwner] = useState({
    firstName: '', lastName: '', email: '', phone: '', split: 0
  });

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

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewOwner({ ...newOwner, [name]: value });
  };

  const handleAddNewOwner = () => {
    onAddOwner(newOwner);
    setNewOwner({ firstName: '', lastName: '', email: '', phone: '', split: 0 });
    setAddingOwner(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Owner Profiles</h2>

      <div className="text-right mb-6">
        <button
          onClick={() => setAddingOwner(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Owner
        </button>
      </div>

      {addingOwner && (
        <div className="bg-white shadow p-4 mb-6 rounded border border-green-300">
          <h3 className="text-xl font-semibold mb-2">New Owner</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="firstName" value={newOwner.firstName} onChange={handleNewChange} placeholder="First Name" className="border p-2 rounded" />
            <input name="lastName" value={newOwner.lastName} onChange={handleNewChange} placeholder="Last Name" className="border p-2 rounded" />
            <input name="email" value={newOwner.email} onChange={handleNewChange} placeholder="Email" className="border p-2 rounded" />
            <input name="phone" value={newOwner.phone} onChange={handleNewChange} placeholder="Phone" className="border p-2 rounded" />
            <input name="split" type="number" min="0" max="100" value={newOwner.split} onChange={handleNewChange} placeholder="Split %" className="border p-2 rounded" />
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={handleAddNewOwner} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setAddingOwner(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}

      {owners.length === 0 ? (
        <p className="text-center text-gray-500">No owners added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {owners.map((owner) => (
            <div key={owner.id} className="border rounded-lg p-4 shadow-sm bg-white">
              {editingOwnerId === owner.id ? (
                <>
                  <input name="firstName" value={editedOwner.firstName} onChange={handleChange} className="w-full mb-2 border p-2 rounded" />
                  <input name="lastName" value={editedOwner.lastName} onChange={handleChange} className="w-full mb-2 border p-2 rounded" />
                  <input name="email" value={editedOwner.email} onChange={handleChange} className="w-full mb-2 border p-2 rounded" />
                  <input name="phone" value={editedOwner.phone} onChange={handleChange} className="w-full mb-2 border p-2 rounded" />
                  <input name="split" value={editedOwner.split} onChange={handleChange} type="number" className="w-full mb-2 border p-2 rounded" />
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
