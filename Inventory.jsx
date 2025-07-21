import React, { useState } from 'react';

export default function Inventory({ inventory, setInventory }) {
  const handleMarkSold = (id, priceSold) => {
    const updated = inventory.map(item =>
      item.id === id ? { ...item, sold: true, dateSold: new Date().toLocaleDateString(), soldPrice: priceSold } : item
    );
    setInventory(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
  };

  const [saleInput, setSaleInput] = useState({});

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>

      {inventory.length === 0 && <p>No items in inventory yet.</p>}

      {inventory
        .sort((a, b) => a.sold === b.sold ? 0 : a.sold ? 1 : -1)
        .map((item, i) => (
          <div key={i} className={`border p-4 rounded shadow-sm ${item.sold ? 'bg-red-50' : 'bg-white'}`}>
            <div className="flex space-x-4 overflow-x-auto mb-2">
              {item.imageUrls?.map((img, idx) => (
                <img key={idx} src={img} alt={`Item ${i}`} className="w-32 h-32 object-cover rounded" />
              ))}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Owner:</strong> {item.owner}</p>
            <p><strong>Date Added:</strong> {item.dateAdded}</p>
            {item.sold && (
              <>
                <p className="text-red-600 font-semibold">Sold for ${item.soldPrice}</p>
                <p className="text-sm">Sold on: {item.dateSold}</p>
              </>
            )}

            {!item.sold && (
              <div className="mt-3">
                <input
                  type="number"
                  placeholder="Sold Price"
                  className="border p-2 rounded w-full mb-2"
                  value={saleInput[item.id] || ''}
                  onChange={(e) =>
                    setSaleInput({ ...saleInput, [item.id]: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    const priceSold = saleInput[item.id];
                    if (!priceSold) return alert("Please enter sold price");
                    handleMarkSold(item.id, priceSold);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Mark as Sold
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
