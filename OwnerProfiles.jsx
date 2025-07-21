import React, { useState } from 'react';
import OwnerForm from './OwnerForm.jsx';
import OwnerCard from './OwnerCard.jsx';

export default function OwnerProfiles() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', image: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
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
      <OwnerForm
        form={form}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        editing={editingIndex !== null}
      />
      <div className="space-y-4 mt-6">
        {owners.map((owner, index) => (
          <OwnerCard
            key={index}
            owner={owner}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}
