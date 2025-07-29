import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function OwnerProfile() {
  const { ownerName } = useParams();
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ count: 0, total: 0, payout: 0 });
  const [filter, setFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      const allItems = snapshot.docs.map(doc => doc.data());
      const ownerItems = allItems.filter(item => item.owner === ownerName);
      setItems(ownerItems);
      const summary = ownerItems.reduce((acc, item) => {
        acc.count++;
        acc.total += parseFloat(item.price || 0);
        acc.payout += parseFloat(item.payout || 0);
        return acc;
      }, { count: 0, total: 0, payout: 0 });
      summary.percentSold = Math.round((ownerItems.filter(i => i.status === 'Sold').length / ownerItems.length) * 100);
      setTotals(summary);
    }
    fetchItems();
  }, [ownerName]);

  return (
    <div className="p-6">
      <button onClick={() => {
        const filtered = items.filter(i => (filter === 'All' || i.status === filter) && (!startDate || new Date(i.dateSold) >= new Date(startDate)) && (!endDate || new Date(i.dateSold) <= new Date(endDate)));
        const csv = ["Item,Status,Price,Payout,Date Sold"].concat(filtered.map(i => `${i.name},${i.status},${i.price},${i.payout},${i.dateSold || ''}`)).join('
');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${ownerName}_items.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Export CSV</button>
      <h1 className="text-2xl font-bold mb-1">{ownerName}'s Items</h1>
      <p className="text-gray-600 mb-4">{totals.percentSold || 0}% sold</p>
      <div className="mb-4 flex gap-4 flex-wrap">
        <div>
          <label className="block mb-1">Filter by status:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-2">
            <option value="All">All</option>
            <option value="Sold">Sold</option>
            <option value="In Inventory">In Inventory</option>
            <option value="Pending Pickup">Pending Pickup</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-2" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Search items by name:</label>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 w-full max-w-md"
          placeholder="Enter item name..."
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Item</th>
            <th className="p-2">Status</th>
            <th className="p-2">Price</th>
            <th className="p-2">Payout</th>
            <th className="p-2">Date Sold</th>
          </tr>
        </thead>
        <tbody>
          {items.filter(i => (filter === 'All' || i.status === filter) && (!startDate || new Date(i.dateSold) >= new Date(startDate)) && (!endDate || new Date(i.dateSold) <= new Date(endDate)) && (!search || i.name.toLowerCase().includes(search.toLowerCase()))).sort((a, b) => (a.status === 'Sold' ? 1 : -1)).map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">${item.price}</td>
              <td className="p-2">${item.payout}</td>
              <td className="p-2">{item.dateSold || '-'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold border-t">
            <td className="p-2">Totals</td>
            <td className="p-2">{totals.count}</td>
            <td className="p-2">${totals.total.toFixed(2)}</td>
            <td className="p-2">${totals.payout.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
