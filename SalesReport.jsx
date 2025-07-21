// src/components/SalesReport.jsx
import React from 'react';

export default function SalesReport({ inventory }) {
  const soldItems = inventory.filter(item => item.isSold);

  const ownerMap = soldItems.reduce((acc, item) => {
    if (!acc[item.owner]) acc[item.owner] = [];
    acc[item.owner].push(item);
    return acc;
  }, {});

  const calculateDaysInInventory = (item) => {
    const addedDate = new Date(item.dateAdded);
    const soldDate = new Date(item.soldDate);
    const diff = Math.floor((soldDate - addedDate) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
      {Object.entries(ownerMap).length === 0 && (
        <p className="text-gray-500">No sales yet.</p>
      )}
      {Object.entries(ownerMap).map(([owner, items]) => (
        <div key={owner} className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{owner}</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="border-b py-2">Item</th>
                <th className="border-b py-2">Sale Price</th>
                <th className="border-b py-2">Payout</th>
                <th className="border-b py-2">Profit</th>
                <th className="border-b py-2">Days in Inv.</th>
                <th className="border-b py-2">Sold Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="py-2 border-b">{item.title}</td>
                  <td className="py-2 border-b">${item.soldPrice}</td>
                  <td className="py-2 border-b">${item.payout ?? '-'}</td>
                  <td className="py-2 border-b">${item.profit ?? '-'}</td>
                  <td className="py-2 border-b">{calculateDaysInInventory(item)} days</td>
                  <td className="py-2 border-b">{item.soldDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
