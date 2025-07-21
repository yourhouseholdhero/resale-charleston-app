// src/components/InventoryList.jsx
import React, { useState, useEffect } from 'react';

export default function InventoryList({ inventory, updateInventory }) {
  const [salePrompt, setSalePrompt] = useState(null);
  const [salePrice, setSalePrice] = useState('');

  const markAsSold = (id) => {
    const item = inventory.find(i => i.id === id);
    setSalePrompt({ ...item });
    setSalePrice('');
  };

  const confirmSale = () => {
    const updated = inventory.map(item =>
      item.id === salePrompt.id
        ? {
            ...item,
            isSold: true,
            soldDate: new Date().toLocaleDateString(),
            soldPrice: salePrice,
            profit: item.owner === 'Resale Charleston'
              ? Number(salePrice) - Number(item.pricePaid)
              : Number(salePrice) * (1 - item.split / 100),
            payout: item.owner === 'Resale Charleston'
              ? null
              : Number(salePrice) * (item.split / 100)
          }
        : item
    );
    updateInventory(updated);
    setSalePrompt(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.length === 0 && (
          <div className="text-gray-500">No items in inventory yet.</div>
        )}
        {inventory.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm">Owner: {item.owner}</p>
            <p className="text-sm">Est. Value: ${item.estimatedValue}</p>
            <div className="my-2">
              {item.photos?.map((url, idx) => (
                <img key={idx} src={url} alt={`photo-${idx}`} className="h-24 w-24 object-cover rounded mr-2 inline-block" />
              ))}
            </div>
            {item.isSold ? (
              <div className="text-green-600 text-sm mt-2">Sold for ${item.soldPrice} on {item.soldDate}</div>
            ) : (
              <button
                onClick={() => markAsSold(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                Mark as Sold
              </button>
            )}
          </div>
        ))}
      </div>

      {salePrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-2">Confirm Sale</h3>
            <p>How much did <strong>{salePrompt.title}</strong> sell for?</p>
            <input
              type="number"
              className="w-full border mt-2 p-2 rounded"
              placeholder="Enter Sale Price"
              value={salePrice}
              onChange={e => setSalePrice(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setSalePrompt(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmSale} className="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
