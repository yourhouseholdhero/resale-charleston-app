import React, { useEffect, useState } from 'react';
import { getItems } from './firebase';
import EditItem from './EditItem';

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      {selectedItem ? (
        <EditItem selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Owner</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-2 border">
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt="Item" className="w-20 h-20 object-cover" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.owner}</td>
                <td className="p-2 border">${item.price}</td>
                <td className="p-2 border">{item.room}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
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
