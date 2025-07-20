
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerGallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('https://resale-charleston-app.onrender.com/api/items')
      .then(res => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  const filtered = items
    .filter(item => !item.sold)
    .filter(item =>
      filter ? item.type?.toLowerCase().includes(filter.toLowerCase()) || item.room?.toLowerCase().includes(filter.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter by type or room..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <select
          onChange={e => setSort(e.target.value)}
          className="p-2 border rounded ml-4"
        >
          <option value="">Sort</option>
          <option value="low">Price: Low-High</option>
          <option value="high">Price: High-Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">Come back soon, more items are loading.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="border rounded overflow-hidden shadow hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.photos?.[0]} alt="" className="w-full h-32 object-cover" />
              <div className="p-2">
                <div className="font-semibold">{item.title}</div>
                <div className="text-emerald-600">${item.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedItem(null)}>
          <div className="bg-white p-6 rounded max-w-sm w-full shadow-lg" onClick={e => e.stopPropagation()}>
            <img src={selectedItem.photos?.[0]} alt="" className="w-full h-48 object-cover mb-2 rounded" />
            <h2 className="text-xl font-bold mb-1">{selectedItem.title}</h2>
            <p className="text-gray-700 mb-2">{selectedItem.description}</p>
            <p><strong>Type:</strong> {selectedItem.type}</p>
            <p><strong>Room:</strong> {selectedItem.room}</p>
            <p className="text-emerald-600 font-semibold mt-2">${selectedItem.price}</p>
            <a href="mailto:resalecharleston@gmail.com" className="block mt-4 text-center bg-emerald-600 text-white py-2 rounded">Email to Book</a>
          </div>
        </div>
      )}
    </div>
  );
}
