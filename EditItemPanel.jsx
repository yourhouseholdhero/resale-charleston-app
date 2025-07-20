import React from 'react';

export default function EditItemPanel({ item, onUpdate }) {
  return (
    <div className="border p-3 rounded bg-slate-50">
      <h3 className="font-semibold">Edit Item</h3>
      <input type="text" value={item.title} onChange={e => onUpdate('title', e.target.value)} />
      <textarea value={item.description} onChange={e => onUpdate('description', e.target.value)} />
      <input type="number" value={item.price} onChange={e => onUpdate('price', e.target.value)} />
    </div>
  );
}
