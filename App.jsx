
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const backendURL = 'https://resale-charleston-app.onrender.com';
  const [activeTab, setActiveTab] = useState('customer');
  const [inventory, setInventory] = useState([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (activeTab === 'customer') {
      axios.get(`${backendURL}/api/items`)
        .then(r => setInventory(r.data))
        .catch(console.error);
    }
  }, [activeTab]);

  const handleAddItem = () => {
    const newItem = { title, owner, price: Number(price), sold: false };
    axios.post(`${backendURL}/api/items`, newItem)
      .then(() => {
        setTitle('');
        setOwner('');
        setPrice('');
        setInventory(prev => [...prev, newItem]);
      })
      .catch(console.error);
  };

  const toggleSold = (id) => {
    axios.put(`${backendURL}/api/items/${id}/sold`)
      .then(() => {
        setInventory(prev => prev.map(item =>
          item.id === id ? { ...item, sold: !item.sold } : item
        ));
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center space-x-4 p-4 bg-gray-200">
        <button onClick={() => setActiveTab('customer')} className="px-4 py-2 bg-white rounded">Customer</button>
        <button onClick={() => setActiveTab('admin')} className="px-4 py-2 bg-white rounded">Admin</button>
      </div>

      {activeTab === 'customer' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {inventory.length === 0 
            ? <p>Come back soon—more items are loading.</p>
            : inventory.map(item => (
                <div key={item.id} className="bg-white shadow rounded p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-sm text-red-500">{item.sold ? 'Sold' : ''}</p>
                </div>
              ))
          }
        </div>
      )}

      {activeTab === 'admin' && (
        <div className="p-6 space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full"/>
          <input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner" className="border p-2 w-full"/>
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-2 w-full"/>
          <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>

          <div className="pt-4">
            <h2 className="font-bold">All Items</h2>
            {inventory.map(item => (
              <div key={item.id} className="flex justify-between items-center p-2 border">
                <div>
                  {item.title} - ${item.price}
                </div>
                <button onClick={() => toggleSold(item.id)} className="text-xs bg-gray-300 px-2 py-1 rounded">
                  {item.sold ? 'Mark Unsold' : 'Mark Sold'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
