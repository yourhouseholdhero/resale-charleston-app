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
      setTotals(summary);
    }
    fetchItems();
  }, [ownerName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{ownerName}'s Items</h1>
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
          {items.filter(i => (filter === 'All' || i.status === filter) && (!startDate || new Date(i.dateSold) >= new Date(startDate)) && (!endDate || new Date(i.dateSold) <= new Date(endDate))).map((item, index) => (
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
