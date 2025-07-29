import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getItemById } from './firebase';

export default function PublicItemView() {
  const [params] = useSearchParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const id = params.get('id');
      if (!id) return;
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        console.error('Error loading item:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [params]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!item) return <div className="p-4">Item not found.</div>;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 border rounded shadow">
      <h1 className="text-xl font-bold">{item.name}</h1>
      <p className="text-gray-700">{item.description}</p>
      <p className="text-lg text-green-700 font-semibold">${item.price}</p>
      {item.images?.length > 0 && (
        <img src={item.images[0]} alt={item.name} className="w-full rounded" />
      )}
    </div>
  );
}
