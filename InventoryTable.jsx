// src/components/InventoryTable.jsx

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function InventoryTable() {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(list);
    }
    fetchItems();
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === sortedItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedItems.map(i => i.id));
    }
  };

  const markSelectedAsSold = async () => {
    if (!selectedIds.length) return alert('No items selected.');
    const confirm = window.confirm(`Mark ${selectedIds.length} items as Sold?`);
    if (!confirm) return;
    for (let id of selectedIds) {
      const ref = doc(db, 'items', id);
      await updateDoc(ref, {
        status: 'Sold',
        dateSold: new Date().toISOString().split('T')[0]
      });
    }
    setItems(prev => prev.map(i => selectedIds.includes(i.id) ? { ...i, status: 'Sold', dateSold: new Date().toISOString().split('T')[0] } : i));
    setSelectedIds([]);
    alert('Items marked as Sold!');
  };

  const deleteSelected = async () => {
    if (!selectedIds.length) return alert('No items selected.');
    const confirm = window.confirm(`Delete ${selectedIds.length} items?`);
    if (!confirm) return;
    for (let id of selectedIds) {
      const ref = doc(db, 'items', id);
      await deleteDoc(ref);
    }
    setItems(prev => prev.filter(i => !selectedIds.includes(i.id)));
    setSelectedIds([]);
    alert('Items deleted.');
  };

  const sortedItems = items
    .filter(i => i.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey] || '';
      const valB = b[sortKey] || '';
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  const exportCSV = () => {
    const headers = ['Name', 'Description', 'Price', 'Category', 'Owner', 'Room', 'Status', 'Date Intake', 'Date Sold'];
    const rows = sortedItems.map(i => [
      i.name,
      i.description,
      i.price,
      i.category,
      i.owner,
      i.room,
      i.status,
      i.dateIntake,
      i.dateSold || ''
    ]);
    const csv = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-64"
          placeholder="Search item..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={markSelectedAsSold} className="bg-blue-600 text-white px-4 py-2 rounded">Mark as Sold</button>
          <button onClick={deleteSelected} className="bg-red-600 text-white px-4 py-2 rounded">Delete Selected</button>
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded">Export CSV</button>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th><input type="checkbox" onChange={toggleAll} checked={selectedIds.length === sortedItems.length} /></th>
            <th onClick={() => handleSort('name')} className="cursor-pointer px-3 py-2">Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Owner</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(item => (
            <React.Fragment key={item.id}>
              <tr
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <td><input type="checkbox" onChange={() => toggleSelect(item.id)} checked={selectedIds.includes(item.id)} /></td>
                <td className="px-3 py-2">{item.name}</td>
                <td>{item.status}</td>
                <td>${item.price}</td>
                <td>{item.owner}</td>
                <td>{item.room}</td>
              </tr>
              {expandedId === item.id && (
                <tr className="bg-gray-50">
                  <td colSpan="6" className="px-3 py-2">
                    {item.image && <img src={item.image} alt={item.name} className="h-40 rounded mb-2" />}
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Date Intake:</strong> {item.dateIntake}</p>
                    <p><strong>Date Sold:</strong> {item.dateSold || 'N/A'}</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
