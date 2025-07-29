mport React, { useEffect, useState } from 'react';
import { getItems } from './firebase';

export default function OwnerReports() {
  const [reports, setReports] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchAndGroup = async () => {
      const data = await getItems();
      const grouped = {};
      data.forEach(item => {
        if (!item.sold || !item.owner) return;
        if (filterDate && new Date(item.dateSold) < new Date(filterDate)) return;
        if (!grouped[item.owner]) grouped[item.owner] = { items: [], totalSales: 0, totalPayouts: 0 };
        grouped[item.owner].items.push(item);
        grouped[item.owner].totalSales += parseFloat(item.salePrice || 0);
        grouped[item.owner].totalPayouts += parseFloat(item.payout || 0);
      });
      setReports(Object.entries(grouped));
    };
    fetchAndGroup();
  }, [filterDate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Owner Sales Reports</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Sale Date (after):</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>
      {reports.map(([owner, report]) => (
        <div key={owner} className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold">{owner}</h3>
          <p>Total Sales: ${report.totalSales.toFixed(2)}</p>
          <p>Total Payouts: ${report.totalPayouts.toFixed(2)}</p>
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-700">
            {report.items.map(item => (
              <li key={item.id}>{item.name} — ${item.salePrice} sold on {new Date(item.dateSold).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
