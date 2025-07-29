import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from './firebase';

export default function PublicItemView() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getItemById(id);
      setItem(data);
    };
    fetchItem();
  }, [id]);

  if (!item) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      {item.images?.[0] && (
        <img src={item.images[0]} alt="Item" className="w-full h-64 object-cover rounded mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
      <p className="text-lg font-semibold text-green-700 mb-2">${item.price}</p>
      <p className="text-gray-700 mb-4">{item.description}</p>
      <p className="text-sm text-gray-400">Item ID: {item.id}</p>
    </div>
  );
}
