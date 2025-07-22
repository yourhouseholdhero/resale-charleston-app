import React from 'react';

export default function SalesReport({ items, owners }) {
  const soldItems = items.filter(item => item.status === 'sold');

  const getOwnerName = (ownerId) => {
    const owner = owners.find(o => o.id === ownerId);
    return owner ? `${owner.firstName} ${owner.lastName}` : 'Unknown';
  };

  const calculatePayouts = (item) => {
    const owner = owners.find(o => o.id === item.ownerId);
    const split = owner ? parseFloat(owner.split) : 50;
    const consignerAmount = (item.soldFor * (split / 100)).toFixed(2);
    const profit = (item.soldFor - consignerAmount).toFixed(2);
    return { consignerAmount, profit };
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Sales Report</h2>
      {soldItems.length === 0 ? (
        <p className="text-center text-gray-500">No sales to report yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Consigner</th>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Split %</th>
                <th className="p-3 text-left">Consigner Payout</th>
                <th className="p-3 text-left">Your Profit</th>
                <th className="p-3 text-left">Sold For</th>
                <th className="p-3 text-left">Date Sold</th>
              </tr>
            </thead>
            <tbody>
              {soldItems.map((item) => {
                const { consignerAmount, profit } = calculatePayouts(item);
                const owner = owners.find(o => o.id === item.ownerId);
                const split = owner ? owner.split : 50;
                return (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{getOwnerName(item.ownerId)}</td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{split}%</td>
                    <td className="p-3">${consignerAmount}</td>
                    <td className="p-3">${profit}</td>
                    <td className="p-3">${item.soldFor}</td>
                    <td className="p-3">{item.soldDate || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
