import React, { useState, useEffect } from 'react';

export default function EditItem({ item, index, onSave, onCancel }) {
  const [editedItem, setEditedItem] = useState({ ...item });

  useEffect(() => {
    setEditedItem({ ...item });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(index, editedItem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>

        <input
          name="name"
          value={editedItem.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          name="description"
          value={editedItem.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          name="price"
          value={editedItem.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          name="owner"
          value={editedItem.owner}
          onChange={handleChange}
          placeholder="Owner"
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
