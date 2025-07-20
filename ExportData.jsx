import React from 'react';

export default function ExportData({ data }) {
  const exportCSV = () => {
    const csv = data.map(d => Object.values(d).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
  };

  return <button onClick={exportCSV} className="bg-gray-700 text-white py-2 px-4 rounded">Export CSV</button>;
}
