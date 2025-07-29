import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from './firebase';
import EditItem from './EditItem';

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} selected items?`)) {
      await Promise.all(selectedIds.map(deleteItem));
      setItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.owner.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by name or owner"
        className="mb-4 p-2 border w-full"
      />
      {selectedIds.length > 0 && (
        <button
          onClick={handleBulkDelete}
          className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Selected ({selectedIds.length})
        </button>
      )}
      {selectedItem ? (
        <EditItem selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Select</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Owner</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map(item => (
              <tr key={item.id} className="border-t transition duration-300 ease-in-out hover:bg-yellow-50">
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td className="p-2 border">
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt="Item" className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.owner}</td>
                <td className="p-2 border">${item.price}</td>
                <td className="p-2 border">{item.room}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
