
import React, { useState, useEffect } from 'react';

export default function CustomerGallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('rc_items');
    const parsed = stored ? JSON.parse(stored) : [];
    setItems(parsed.filter(item => !item.sold));
  }, []);

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        Come back soon, more items are loading.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map(item => (
        <div key={item.id} className="bg-white shadow p-3 rounded">
          <div className="text-lg font-bold text-emerald-600">{item.title}</div>
          <p className="text-gray-500 text-sm">{item.description}</p>
          <p className="mt-2 font-semibold">${item.price}</p>
        </div>
      ))}
    </div>
  );
}
