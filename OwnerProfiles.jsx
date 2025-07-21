import React, { useState } from 'react';

export default function OwnerProfiles() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', image: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...owners];
      updated[editingIndex] = form;
      setOwners(updated);
      setEditingIndex(null);
    } else {
      setOwners([...owners, form]);
    }
    setForm({ name: '', contact: '', image: '' });
  };

  const handleEdit = (index) => {
    setForm(owners[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = owners.filter((_, i) => i !== index);
    setOwners(updated);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Owner Profiles</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Owner Name"
          className="border p-2 w-full"
          required
        />
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact Info"
          className="border p-2 w-full"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingIndex !== null ? 'Update Owner' : 'Add Owner'}
        </button>
      </form>

      <div className="space-y-4">
        {owners.map((owner, index) => (
          <div
            key={index}
            className="border rounded p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{owner.name}</h3>
              <p>{owner.contact}</p>
              {owner.image && (
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="h-20 w-20 object-cover mt-2"
                />
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
