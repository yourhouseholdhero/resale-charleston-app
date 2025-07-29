import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function OwnerProfile() {
  const { ownerName } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const snapshot = await getDocs(collection(db, 'items'));
      const allItems = snapshot.docs.map(doc => doc.data());
      const ownerItems = allItems.filter(item => item.owner === ownerName);
      setItems(ownerItems);
    }
    fetchItems();
  }, [ownerName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{ownerName}'s Items</h1>
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
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">${item.price}</td>
              <td className="p-2">${item.payout}</td>
              <td className="p-2">{item.dateSold || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
