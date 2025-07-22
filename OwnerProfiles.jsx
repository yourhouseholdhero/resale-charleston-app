import React, { useState, useEffect } from 'react';
import { addOwner, fetchOwners } from '../api';

const OwnerProfiles = () => {
  const [owners, setOwners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    percentSplit: '',
  });

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    const data = await fetchOwners();
    setOwners(data || []);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOwner = async () => {
    await addOwner(formData);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', percentSplit: '' });
    setShowForm(false);
    loadOwners();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Owner Profiles</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {showForm ? 'Cancel' : 'Add Owner'}
      </button>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="block mb-2 w-full p-2 border rounded"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="block mb-2 w-full p-2 border rounded"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block mb-2 w-full p-2 border rounded"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="block mb-2 w-full p-2 border rounded"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="percentSplit"
            placeholder="Percent Split"
            className="block mb-4 w-full p-2 border rounded"
            value={formData.percentSplit}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={handleAddOwner}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Owner
          </button>
        </div>
      )}

      <ul className="space-y-4">
        {owners.map((owner, idx) => (
          <li key={idx} className="p-4 border rounded shadow">
            <strong>{owner.firstName} {owner.lastName}</strong><br />
            Phone: {owner.phone}<br />
            Email: {owner.email}<br />
            Split: {owner.percentSplit}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerProfiles;
