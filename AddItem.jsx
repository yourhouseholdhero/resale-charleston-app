import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function AddItem() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file) => {
    const storage = getStorage(app);
    const imageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
    return url;
  };

  const handleGenerateAI = async () => {
    setLoading(true);
    const res = await fetch('/api/ai-describe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    });
    const data = await res.json();
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files[0];
        setImage(file);
        handleImageUpload(file);
      }} />

      {imageUrl && (
        <div className="my-4">
          <img src={imageUrl} alt="Preview" className="w-full h-auto rounded" />
          <button onClick={() => { setImageUrl(''); setImage(null); }} className="text-red-500 mt-2">Remove Image</button>
        </div>
      )}

      {imageUrl && (
        <button onClick={handleGenerateAI} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          Generate with AI
        </button>
      )}

      {loading && <p className="text-center text-gray-600">Generating description...</p>}

      <input className="w-full mb-2 border p-2" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
      <textarea className="w-full mb-2 border p-2" value={description} onChange={e => setDescription(e.target.value)} placeholder="Item Description" />
      <input className="w-full mb-2 border p-2" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />

      <button className="bg-green-600 text-white px-4 py-2 rounded">Add Item</button>
    </div>
  );
}
