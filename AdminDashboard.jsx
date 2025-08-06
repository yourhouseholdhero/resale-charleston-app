import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from 'recharts';

const db = getFirestore(app);

export default function AdminDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      setItems(snapshot.docs.map(doc => doc.data()));
    }
    fetchItems();
  }, []);

  const soldItems = items.filter(i => i.status === 'Sold');
  const totalRevenue = soldItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
  const totalPayouts = soldItems.reduce((acc, item) => acc + parseFloat(item.payout || 0), 0);
  const percentSold = Math.round((soldItems.length / items.length) * 100);

  const ownerData = Array.from(
    items.reduce((map, item) => {
      const count = map.get(item.owner) || 0;
      map.set(item.owner, count + 1);
      return map;
    }, new Map()),
    ([owner, count]) => ({ owner, count })
  );

  const monthlySales = soldItems.reduce((acc, item) => {
    const month = item.dateSold?.slice(0, 7);
    if (!month) return acc;
    acc[month] = (acc[month] || 0) + parseFloat(item.price || 0);
    return acc;
  }, {});
  const monthlyChart = Object.entries(monthlySales).map(([month, total]) => ({ month, total }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">📊 Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-bold">Total Items</h3>
          <p className="text-xl">{items.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-bold">Sold</h3>
          <p className="text-xl">{soldItems.length} ({percentSold}%)</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-bold">Revenue</h3>
          <p className="text-xl">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-lg font-bold">Payouts</h3>
          <p className="text-xl">${totalPayouts.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-md font-bold mb-2">Inventory Status</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={[
                { name: 'Sold', value: soldItems.length },
                { name: 'In Inventory', value: items.length - soldItems.length }
              ]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              <Cell fill="#34d399" />
              <Cell fill="#60a5fa" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-md font-bold mb-2">Items per Owner</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ownerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="owner" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-md font-bold mb-2">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
