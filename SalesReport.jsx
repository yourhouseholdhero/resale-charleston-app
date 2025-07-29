import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function SalesReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [items, setItems] = useState([]);
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      const allItems = snapshot.docs.map(doc => doc.data());
      const filtered = allItems.filter(i => i.status === 'Sold' && (!startDate || new Date(i.dateSold) >= new Date(startDate)) && (!endDate || new Date(i.dateSold) <= new Date(endDate)));

      const summary = {};
      filtered.forEach(item => {
        if (!summary[item.owner]) summary[item.owner] = { total: 0, payout: 0, count: 0 };
        summary[item.owner].count++;
        summary[item.owner].total += parseFloat(item.price || 0);
        summary[item.owner].payout += parseFloat(item.payout || 0);
      });

      setItems(filtered);
      setReport(summary);
      setLoading(false);
    }
    fetchItems();
  }, []);

  if (loading) return <div className="p-6">
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-sm">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label className="block text-sm">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-2" />
        </div>
      </div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Owner</th>
            <th className="p-2">Items Sold</th>
            <th className="p-2">Total Sales</th>
            <th className="p-2">Payout Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(report).map(([owner, data]) => (
            <tr key={owner} className="border-b">
              <td className="p-2 text-blue-600 underline cursor-pointer" onClick={() => window.location.href = `/owner/${owner}`}>{owner}</td>
              <td className="p-2">{data.count}</td>
              <td className="p-2">${data.total.toFixed(2)}</td>
              <td className="p-2">${data.payout.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
