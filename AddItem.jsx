import React, { useState } from 'react';

export default function AddItem({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    room: '',
    owner: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({
        ...formData,
        images: [...files]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.owner) {
      alert('Please fill all required fields.');
      return;
    }
    onAddItem(formData);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      room: '',
      owner: '',
      images: []
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name <span className="text-red-500">*</span></label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Price <span className="text-red-500">*</span></label>
            <input name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Category</label>
            <input name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Room</label>
            <input name="room" value={formData.room} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Owner <span className="text-red-500">*</span></label>
            <input name="owner" value={formData.owner} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div>
          <label className="block mb-1">Upload Images (up to 10)</label>
          <input name="images" type="file" multiple accept="image/*" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Item
        </button>
      </form>
    </div>
  );
}
