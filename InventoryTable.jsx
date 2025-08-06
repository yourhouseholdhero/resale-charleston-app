// src/components/InventoryTable.jsx

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

const getColorClass = (type, value) => {
  const map = {
    room: {
      'Living Room': 'bg-orange-100 text-orange-800',
      Bedroom: 'bg-pink-100 text-pink-800',
      'Dining Room': 'bg-teal-100 text-teal-800',
      Office: 'bg-indigo-100 text-indigo-800',
      Outdoor: 'bg-green-100 text-green-800',
      Other: 'bg-gray-200 text-gray-700',
    },
    category: {
      Sofa: 'bg-yellow-100 text-yellow-800',
      Dresser: 'bg-purple-100 text-purple-800',
      Chair: 'bg-rose-100 text-rose-800',
      Table: 'bg-lime-100 text-lime-800',
      Shelf: 'bg-sky-100 text-sky-800',
    },
  };

  return map[type]?.[value] || 'bg-gray-100 text-gray-700';
};

export default function InventoryTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(docs);
    }
    fetchItems();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Item</th>
            <th className="p-2">Status</th>
            <th className="p-2">Price</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Room</th>
            <th className="p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2">
                {item.image && <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />}
                {item.name}
              </td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">${item.price}</td>
              <td className="p-2">{item.owner}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorClass('room', item.room)}`}>
                  {item.room || '—'}
                </span>
              </td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getColorClass('category', item.category)}`}>
                  {item.category || '—'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
