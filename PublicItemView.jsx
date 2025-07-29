import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from './firebase';
import axios from 'axios';

export default function PublicItemView() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getItemById(id);
      setItem(data);
    };
    fetchItem();
  }, [id]);

  const generateAI = async () => {
    if (!item?.images?.[0]) return;
    setLoading(true);
    try {
      const response = await axios.post('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base', {
        inputs: item.images[0]
      }, {
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_TOKEN`,
          'Content-Type': 'application/json'
        }
      });
      setAiData(response.data[0].generated_text);
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!item) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-4 md:p-6 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-center bg-white shadow-xl rounded-lg border border-gray-200 print:max-w-none print:shadow-none print:border-none print:bg-white">
      {item.images?.[0] && (
        <img src={item.images[0]} alt="Item" className="w-full h-64 md:h-80 object-cover rounded mb-4 print:h-auto" />
      )}
      <h1 className="text-xl md:text-2xl font-bold mb-2 print:text-black">{item.name}</h1>
      <p className="text-base md:text-lg font-semibold text-green-700 mb-2 print:text-black">${item.price}</p>
      <p className="text-sm md:text-base text-gray-700 mb-4 print:text-black">{item.description}</p>
      <p className="text-xs md:text-sm text-gray-500 mb-2 print:text-black">Room: {item.room}</p>

      {item.dateSold && (
        <div className="mt-4 text-left">
          <p className="text-md font-semibold text-blue-700 print:text-black">Sold Info</p>
          <p className="text-sm text-gray-600 print:text-black">Sold On: {item.dateSold}</p>
          <p className="text-sm text-gray-600 print:text-black">Sale Price: ${item.salePrice}</p>
          <p className="text-sm text-gray-600 print:text-black">Payment: {item.paymentType}</p>
        </div>
      )}

      <p className="text-xs md:text-sm text-gray-400 mt-6 print:text-black">Item ID: {item.id}</p>

      <button onClick={generateAI} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Generating Description...' : 'Generate AI Description'}
      </button>

      {aiData && <p className="mt-4 italic text-gray-600">AI Suggestion: {aiData}</p>}
    </div>
  );
}
