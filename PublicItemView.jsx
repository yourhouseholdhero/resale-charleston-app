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
      <p className="text-sm text-gray-500 mb-2">Room: {item.room}</p>
      {item.dateSold && (
        <div className="mt-4 text-left">
          <p className="text-md font-semibold text-blue-700">Sold Info</p>
          <p className="text-sm text-gray-600">Sold On: {item.dateSold}</p>
          <p className="text-sm text-gray-600">Sale Price: ${item.salePrice}</p>
          <p className="text-sm text-gray-600">Payment: {item.paymentType}</p>
        </div>
      )}
      <p className="text-sm text-gray-400 mt-6">Item ID: {item.id}</p>
    </div>
  );
}
