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
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    const updated = prompt('Update price:', item.price);
    if (updated !== null) {
      setItems(prev => prev.map(i => i === item ? { ...i, price: updated } : i));
    }
  };

  const handleClickItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-6">
      <button onClick={() => {
        const filtered = items.filter(i => (filter === 'All' || i.status === filter) && (!startDate || new Date(i.dateSold) >= new Date(startDate)) && (!endDate || new Date(i.dateSold) <= new Date(endDate)) && (!search || i.name.toLowerCase().includes(search.toLowerCase()))).sort((a, b) => b.status !== 'Sold' ? -1 : a.payout > b.payout ? -1 : 1).sort((a, b) => {
            if (!sortKey) return a.status === 'Sold' ? 1 : -1;
            const valA = a[sortKey] || '';
            const valB = b[sortKey] || '';
            if (sortOrder === 'asc') return valA > valB ? 1 : -1;
            return valA < valB ? 1 : -1;
          }).map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 flex gap-2 items-center cursor-pointer" onClick={() => handleClickItem(item)}>
                {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />}
                {item.name}
              </td>
              <td className="p-2">{item.status}</td>
              <td className="p-2 cursor-pointer text-blue-600" onClick={() => handleEdit(item)}>${item.price}</td>
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
          </div>
        </div>
      )}
    </div>
  );
}
