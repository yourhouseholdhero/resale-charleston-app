// src/components/ExportCSV.jsx

import React from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function ExportCSV() {
  const handleExport = async () => {
    const snapshot = await getDocs(collection(db, 'items'));
    const items = snapshot.docs.map(doc => doc.data());

    const headers = ['Name', 'Description', 'Price', 'Payout', 'Category', 'Owner', 'Room', 'Status', 'DateSold', 'DateIntake'];
    const rows = items.map(item => [
      item.name,
      item.description,
      item.price,
      item.payout,
      item.category,
      item.owner,
      item.room,
      item.status,
      item.dateSold || '',
      item.dateIntake || ''
    ]);

    const csvContent = [headers, ...rows].map(r => r.map(f => `"${String(f || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventory_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleExport} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
      📤 Export Inventory CSV
    </button>
  );
}
