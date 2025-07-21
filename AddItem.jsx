import React, { useState, useEffect } from 'react';

export default function Inventory({ inventory, setInventory }) {
  const [refresh, setRefresh] = useState(false);

  const handleMarkSold = (id) => {
    const salePrice = prompt("Enter sale price:");
    if (!salePrice) return;

    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        return {
          ...item,
          sold: true,
          salePrice,
          dateSold: new Date().toLocaleDateString()
        };
      }
      return item;
    });

    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    setRefresh(!refresh);
  };

  useEffect(() => {
    const stored = localStorage.getItem("inventory");
    if (stored) setInventory(JSON.parse(stored));
  }, [refresh]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
      {inventory.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((item) => (
            <div key={item.id} className="border p-4 rounded bg-white shadow">
              <img src={item.imageUrls?.[0]} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Owner:</strong> {item.owner}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Sold:</strong> {item.sold ? `✅ for $${item.salePrice}` : '❌ Not yet'}</p>
              {!item.sold && (
                <button
                  onClick={() => handleMarkSold(item.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Mark as Sold
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
