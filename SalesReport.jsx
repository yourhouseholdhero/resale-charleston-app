import React from 'react';

export default function SalesReport({ owners }) {
  const calculateTotal = (items, key) =>
    items.reduce((sum, item) => sum + (item[key] || 0), 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">Sales Report</h2>
      {owners.map((owner, index) => {
        const soldItems = (owner.items || []).filter(item => item.sold);
        const totalSold = calculateTotal(soldItems, 'soldPrice');
        const totalOwed = calculateTotal(soldItems, 'owed');
        const totalProfit = totalSold - totalOwed;

        return (
          <div key={index} className="border p-4 rounded mb-6 shadow bg-white">
            <h3 className="text-lg font-semibold mb-2">{owner.firstName} {owner.lastName}</h3>
            <p><strong>Total Sales:</strong> ${totalSold}</p>
            <p><strong>Total Owed to Owner:</strong> ${totalOwed}</p>
            <p><strong>Profit:</strong> ${totalProfit}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>Email:</strong> {owner.email}</p>
              <p><strong>Phone:</strong> {owner.phone}</p>
            </div>
            <div className="mt-3 space-y-2">
              {soldItems.map((item, idx) => (
                <div key={idx} className="border p-2 rounded bg-slate-50">
                  <p><strong>{item.title}</strong> - Sold for ${item.soldPrice}</p>
                  <p>Owed: ${item.owed} • Paid: {item.paid ? '✅' : '❌'}</p>
                  <p>Profit: ${item.soldPrice - item.owed}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
