// src/components/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { app } from '../firebase';

const db = getFirestore(app);

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({ sold: 0, inventory: 0, value: 0 });
  const [ownerSales, setOwnerSales] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snap = await getDocs(collection(db, 'items'));
      const data = snap.docs.map(doc => doc.data());
      setItems(data);

      const soldItems = data.filter(i => i.status === 'Sold');
      const inventoryItems = data.filter(i => i.status !== 'Sold');
      const totalSales = soldItems.reduce((sum, i) => sum + parseFloat(i.price || 0), 0);
      setSummary({
        sold: soldItems.length,
        inventory: inventoryItems.length,
        value: totalSales.toFixed(2)
      });

      const salesByOwner = {};
      soldItems.forEach(i => {
        if (!salesByOwner[i.owner]) salesByOwner[i.owner] = 0;
        salesByOwner[i.owner] += parseFloat(i.price || 0);
      });

      const topOwners = Object.entries(salesByOwner)
        .map(([owner, total]) => ({ owner, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      setOwnerSales(topOwners);
    }

    fetchData();
  }, []);

  const pieData = [
    { name: 'Sold', value: summary.sold },
    { name: 'In Inventory', value: summary.inventory }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Sold Items</h2>
          <p className="text-2xl">{summary.sold}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">In Inventory</h2>
          <p className="text-2xl">{summary.inventory}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Sales Total</h2>
          <p className="text-2xl">${summary.value}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Inventory Distribution</h2>
          <PieChart width={300} height={200}>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
              <Cell fill="#34d399" />
              <Cell fill="#60a5fa" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Top Owners by Sales</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="border-b">
                <th className="p-2">Owner</th>
                <th className="p-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {ownerSales.map(({ owner, total }) => (
                <tr key={owner} className="border-b">
                  <td className="p-2 text-blue-600 underline cursor-pointer" onClick={() => window.location.href = `/owner/${owner}`}>{owner}</td>
                  <td className="p-2">${total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
