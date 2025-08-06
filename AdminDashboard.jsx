// src/components/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const snap = await getDocs(collection(db, 'items'));
      const items = snap.docs.map(doc => doc.data());
      const totals = {
        total: items.length,
        sold: items.filter(i => i.status === 'Sold').length,
        value: items.reduce((sum, i) => sum + parseFloat(i.price || 0), 0),
        payout: items.reduce((sum, i) => sum + parseFloat(i.payout || 0), 0),
        byOwner: {}
      };
      items.forEach(item => {
        if (!totals.byOwner[item.owner]) {
          totals.byOwner[item.owner] = { count: 0, value: 0, payout: 0 };
        }
        totals.byOwner[item.owner].count++;
        totals.byOwner[item.owner].value += parseFloat(item.price || 0);
        totals.byOwner[item.owner].payout += parseFloat(item.payout || 0);
      });
      setSummary(totals);
      setLoading(false);
    }
    loadData();
  }, []);

  const exportCSV = () => {
    const headers = ['Owner,Items,Total Value,Payout'];
    const rows = Object.entries(summary.byOwner).map(([owner, stats]) =>
      `${owner},${stats.count},${stats.value.toFixed(2)},${stats.payout.toFixed(2)}`
    );
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'owner-report.csv';
    a.click();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">Total Items: {summary.total}</div>
        <div className="p-4 bg-green-100 rounded shadow">Sold Items: {summary.sold}</div>
        <div className="p-4 bg-yellow-100 rounded shadow">Total Value: ${summary.value.toFixed(2)}</div>
        <div className="p-4 bg-pink-100 rounded shadow">Total Payout: ${summary.payout.toFixed(2)}</div>
      </div>

      <button onClick={exportCSV} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">Export CSV</button>

      <table className="w-full border text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2">Owner</th>
            <th className="p-2">Items</th>
            <th className="p-2">Total Value</th>
            <th className="p-2">Payout</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary.byOwner).map(([owner, data]) => (
            <tr key={owner} className="border-b">
              <td className="p-2">{owner}</td>
              <td className="p-2">{data.count}</td>
              <td className="p-2">${data.value.toFixed(2)}</td>
              <td className="p-2">${data.payout.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
