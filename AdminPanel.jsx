
import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('rc_items');
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({
    title: '', owner: '', split: '', price: '', description: '',
    photos: [], sold: false, paid: false, cost: ''
  });

  useEffect(() => {
    localStorage.setItem('rc_items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    const id = `RC-${Date.now()}`;
    const profit = form.sold
      ? form.owner.toLowerCase().includes('resale')
        ? parseFloat(form.price) - parseFloat(form.cost)
        : parseFloat(form.price) * ((100 - parseFloat(form.split)) / 100)
      : 0;
    setItems([...items, { ...form, id, profit }]);
    setForm({ title: '', owner: '', split: '', price: '', description: '', photos: [], sold: false, paid: false, cost: '' });
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Add New Item</h2>
        <input className="border p-2 w-full mb-1" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="border p-2 w-full mb-1" placeholder="Owner" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} />
        <input className="border p-2 w-full mb-1" placeholder="Percent Split (if not resale)" value={form.split} onChange={e => setForm({ ...form, split: e.target.value })} />
        <input className="border p-2 w-full mb-1" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2 w-full mb-1" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input className="border p-2 w-full mb-1" placeholder="Cost (if owned)" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
        <div className="mb-1">
          <label className="mr-2">Sold</label>
          <input type="checkbox" checked={form.sold} onChange={e => setForm({ ...form, sold: e.target.checked })} />
        </div>
        <button onClick={addItem} className="bg-emerald-600 text-white py-2 px-4 rounded">Add Item</button>
      </div>

      {items.map(item => (
        <div key={item.id} className="bg-white p-4 rounded shadow">
          <div className="text-lg font-bold">{item.title} <span className="text-gray-500 text-sm">({item.id})</span></div>
          <div className="text-sm text-gray-600">Owner: {item.owner} | ${item.price}</div>
          <div className="text-sm">{item.description}</div>
          <div className="mt-1 text-xs text-gray-500">Sold: {item.sold ? 'Yes' : 'No'} | Paid: {item.paid ? 'Yes' : 'No'} | Profit: ${item.profit?.toFixed(2)}</div>
          <div className="mt-1 flex space-x-2">
            <label>Mark Sold</label>
            <input type="checkbox" checked={item.sold} onChange={e => updateItem(item.id, 'sold', e.target.checked)} />
            <label>Mark Paid</label>
            <input type="checkbox" checked={item.paid} onChange={e => updateItem(item.id, 'paid', e.target.checked)} />
          </div>
        </div>
      ))}
    </div>
  );
}
