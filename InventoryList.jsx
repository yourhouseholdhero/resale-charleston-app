import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, markItemSold } from './firebase';
import QRCodeLabel from './QRCodeLabel';

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to load inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item permanently?')) {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleMarkSold = async (id) => {
    if (window.confirm('Mark this item as sold?')) {
      await markItemSold(id);
      setItems(items.map(item => item.id === id ? { ...item, sold: true } : item));
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'sold') return item.sold;
    if (filter === 'available') return !item.sold;
    return true;
  });

  if (loading) return <div className="p-4">Loading inventory...</div>;
  if (!filteredItems.length) return <div className="p-4">No items found.</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setFilter('available')} className={`px-3 py-1 rounded ${filter==='available' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Available</button>
        <button onClick={() => setFilter('sold')} className={`px-3 py-1 rounded ${filter==='sold' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>Sold</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="border rounded p-4 shadow space-y-2">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-600 font-semibold">${item.price}</p>
            {item.images?.[0] && (
              <img src={item.images[0]} alt={item.name} className="w-full rounded" />
            )}
            <QRCodeLabel itemId={item.id} />
            <div className="flex space-x-2 pt-2">
              <button onClick={() => handleMarkSold(item.id)} className="text-xs px-3 py-1 bg-yellow-500 text-white rounded">Mark Sold</button>
              <button onClick={() => handleDelete(item.id)} className="text-xs px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
