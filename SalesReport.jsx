import React, { useState, useEffect } from 'react';

export default function SalesReport() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('rc_items');
    const parsed = stored ? JSON.parse(stored) : [];
    setItems(parsed.filter(item => item.sold));
  }, []);

  const owners = {};
  items.forEach(item => {
    const split = parseFloat(item.split || 50);
    const payout = item.price * (split / 100);
    const profit = item.price - payout;
    if (!owners[item.owner]) owners[item.owner] = { total: 0, payout: 0, profit: 0, count: 0 };
    owners[item.owner].total += item.price;
    owners[item.owner].payout += payout;
    owners[item.owner].profit += profit;
    owners[item.owner].count += 1;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-teal-600 mb-4">Sales Report</h2>
      {Object.keys(owners).length === 0 ? (
        <p className="text-gray-600">No sales recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(owners).map(([owner, stats]) => (
            <div key={owner} className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold text-lg text-indigo-700">{owner}</h3>
              <p>Total Items Sold: {stats.count}</p>
              <p>Total Revenue: ${stats.total.toFixed(2)}</p>
              <p>Total Payouts: ${stats.payout.toFixed(2)}</p>
              <p>Total Profit: ${stats.profit.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
