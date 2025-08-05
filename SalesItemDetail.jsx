import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function SalesItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const ref = doc(db, 'items', itemId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setItem({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchItem();
  }, [itemId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6 text-red-600">Item not found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      <img src={item.image} alt={item.name} className="w-full h-60 object-cover rounded mb-4" />
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <p><strong>Owner:</strong> {item.owner}</p>
      <p><strong>Room:</strong> {item.room}</p>
      <p><strong>Status:</strong> {item.status}</p>
      <p><strong>Date Sold:</strong> {item.dateSold || 'N/A'}</p>
      <p><strong>Payout:</strong> ${item.payout || 0}</p>
    </div>
  );
}
