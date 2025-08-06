import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const db = getFirestore(app);

export default function OwnerProfile() {
  const { ownerName } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ count: 0, total: 0, payout: 0 });
  const [filter, setFilter] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      const allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), ref: doc.ref }));
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

  const handleClickItem = (item) => setSelectedItem(item);

  const sortedFilteredItems = items
    .filter(i =>
      (filter === 'All' || i.status === filter) &&
      (!startDate || (i.dateSold && new Date(i.dateSold) >= startDate)) &&
      (!endDate || (i.dateSold && new Date(i.dateSold) <= endDate)) &&
      (!search || i.name.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortKey) return a.status === 'Sold' ? 1 : -1;
      const valA = a[sortKey] || '';
      const valB = b[sortKey] || '';
      return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Inventory Overview</h2>
        <PieChart width={300} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={[
              { name: 'Sold', value: items.filter(i => i.status === 'Sold').length },
              { name: 'In Inventory', value: items.filter(i => i.status !== 'Sold').length }
            ]}
            cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label
          >
            <Cell key="sold" fill="#34d399" />
            <Cell key="inventory" fill="#60a5fa" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <select className="border p-2 rounded" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Sold">Sold</option>
          <option value="In Inventory">In Inventory</option>
          <option value="Pending">Pending</option>
        </select>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Start Date"
          className="border p-2 rounded"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          placeholderText="End Date"
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Search items..."
          className="border p-2 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Item</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('price')}>Price</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('payout')}>Payout</th>
            <th className="p-2">Date Sold</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedFilteredItems.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 flex gap-2 items-center cursor-pointer" onClick={() => handleClickItem(item)}>
                {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />}
                {item.name}
              </td>
              <td className={`p-2 ${item.status === 'Sold' ? 'text-green-600' : item.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'}`}>{item.status}</td>
              <td className="p-2 text-blue-600 cursor-pointer" onClick={() => handleClickItem(item)}>${item.price}</td>
              <td className="p-2">${item.payout}</td>
              <td className="p-2">{item.dateSold || '-'}</td>
              <td className="p-2">
                <button className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/edit/${item.id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold border-t">
            <td className="p-2">Totals</td>
            <td className="p-2">{totals.count}</td>
            <td className="p-2">${totals.total.toFixed(2)}</td>
            <td className="p-2">${totals.payout.toFixed(2)}</td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
      </table>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full relative">
            <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2 text-gray-500">✖</button>
            <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
            {selectedItem.image && <img src={selectedItem.image} alt="" className="w-full h-auto mb-4" />}
            <p><strong>Status:</strong> {selectedItem.status}</p>
            <p><strong>Price:</strong> ${selectedItem.price}</p>
            <p><strong>Payout:</strong> ${selectedItem.payout}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Date Sold:</strong> {selectedItem.dateSold || '-'}</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={async () => {
                  await selectedItem.ref.update({
                    status: 'Sold',
                    dateSold: new Date().toISOString().split('T')[0]
                  });
                  setItems(prev => prev.map(i => i.id === selectedItem.id ? { ...i, status: 'Sold' } : i));
                  setSelectedItem(null);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Mark as Sold
              </button>
              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this item?')) {
                    await selectedItem.ref.delete();
                    setItems(prev => prev.filter(i => i.id !== selectedItem.id));
                    setSelectedItem(null);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
