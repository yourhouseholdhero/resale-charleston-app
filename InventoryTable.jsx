import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function InventoryTable() {
  const [items, setItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, 'items'));
      const allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(allItems);
    };
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

  const deleteItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    await deleteDoc(doc(db, 'items', id));
    setItems(prev => prev.filter(i => i.id !== id));
    setExpandedItemId(null);
  };

  const markItemSold = async (id) => {
    const ref = doc(db, 'items', id);
    const dateSold = new Date().toISOString().split('T')[0];
    await updateDoc(ref, { status: 'Sold', dateSold });
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'Sold', dateSold } : i));
  };

  const filteredItems = items
    .filter(i =>
      i.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      i.owner?.toLowerCase().includes(filterText.toLowerCase()) ||
      i.description?.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey] || '';
      const valB = b[sortKey] || '';
      return sortOrder === 'asc'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">📦 Inventory List</h2>
      <input
        className="border p-2 mb-4 w-full md:w-1/2"
        placeholder="Search by name, owner, or description..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <table className="w-full border-collapse bg-white shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('owner')}>Owner</th>
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('price')}>Price</th>
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('status')}>Status</th>
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('dateSold')}>Date Sold</th>
            <th className="p-2 text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <React.Fragment key={item.id}>
              <tr className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.owner}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">{item.dateSold || '-'}</td>
                <td className="p-2 text-center">
                  <button
                    className="text-blue-600"
                    onClick={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
                  >
                    {expandedItemId === item.id ? '▲' : '▼'}
                  </button>
                </td>
              </tr>
              {expandedItemId === item.id && (
                <tr>
                  <td colSpan="6" className="bg-gray-50 p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      {item.image && (
                        <img src={item.image} alt="Preview" className="w-40 h-40 object-cover rounded" />
                      )}
                      <div>
                        <p><strong>Description:</strong> {item.description}</p>
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Room:</strong> {item.room}</p>
                        <div className="mt-4 flex gap-2 flex-wrap">
                          <a
                            href={`/edit/${item.id}`}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                          {item.status !== 'Sold' && (
                            <button
                              onClick={() => markItemSold(item.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                              Mark Sold
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
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
