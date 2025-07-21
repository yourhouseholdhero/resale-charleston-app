import React from 'react';

export default function InventoryTable({ inventory, markAsSold }) {
  if (inventory.length === 0) {
    return <div className="p-4 text-gray-600">No inventory items yet.</div>;
  }

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-emerald-700 text-white">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Owner</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Sold</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.owner}</td>
              <td className="p-3">${item.price}</td>
              <td className="p-3">{item.sold ? '✅' : '❌'}</td>
              <td className="p-3">
                {!item.sold && (
                  <button
                    onClick={() => {
                      const soldPrice = prompt('Enter sold price:');
                      if (soldPrice) {
                        markAsSold(item.id, soldPrice);
                      }
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Mark as Sold
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
