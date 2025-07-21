
import React, { useState } from 'react';

export default function OwnerProfiles() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    split: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOwner = () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.split) {
      alert("First Name, Last Name, Phone and Split % are required.");
      return;
    }
    setOwners([...owners, form]);
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      split: ''
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Owner Profile</h2>
      <div className="grid gap-3 max-w-md">
        <input
          name="firstName"
          placeholder="First Name"
          className="p-2 border rounded"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className="p-2 border rounded"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          className="p-2 border rounded"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="split"
          placeholder="Percent Split (e.g. 50)"
          className="p-2 border rounded"
          type="number"
          value={form.split}
          onChange={handleChange}
        />
        <button
          onClick={handleAddOwner}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Owner
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Owner List</h3>
        {owners.length === 0 ? (
          <p>No owners added yet.</p>
        ) : (
          <ul className="space-y-2">
            {owners.map((owner, i) => (
              <li key={i} className="p-3 border rounded bg-white shadow-sm">
                {owner.firstName} {owner.lastName} – {owner.phone} ({owner.split}% split)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
