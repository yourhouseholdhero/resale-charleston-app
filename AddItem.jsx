// src/components/AddItem.jsx

import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);
const storage = getStorage(app);

const getRoomColor = (room) => {
  const map = {
    'Living Room': 'bg-orange-100 text-orange-800',
    Bedroom: 'bg-pink-100 text-pink-800',
    'Dining Room': 'bg-teal-100 text-teal-800',
    Office: 'bg-indigo-100 text-indigo-800',
    Outdoor: 'bg-green-100 text-green-800',
    Other: 'bg-gray-200 text-gray-700',
  };
  return map[room] || 'bg-gray-100 text-gray-800';
};

export default function AddItem() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [room, setRoom] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [highlight, setHighlight] = useState({ name: false, description: false, price: false });

  const roomList = ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor', 'Other'];
  const isNewRoom = room && !roomList.includes(room);

  useEffect(() => {
    const fetchOwners = async () => {
      const snapshot = await getDocs(collection(db, 'owners'));
      setOwners(snapshot.docs.map(doc => doc.data().name));
    };
    fetchOwners();
  }, []);

  const handleImageUpload = async (file) => {
    const imageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
    return url;
  };

  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/ai-describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
      if (!res.ok) throw new Error('AI generation failed.');
      const data = await res.json();
      setName(data.name || '');
      setDescription(data.description || '');
      setPrice(data.price || '');
      setCategory(data.category || '');
      setHighlight({
        name: !data.name,
        description: !data.description,
        price: !data.price
      });
    } catch (err) {
      alert(`Error: ${err.message}\nTry again or enter details manually.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !imageUrl || !owner || !room) return alert('Missing fields!');
    await addDoc(collection(db, 'items'), {
      name,
      description,
      price,
      category,
      image: imageUrl,
      owner,
      room,
      status: 'In Inventory',
      dateIntake: new Date().toISOString().split('T')[0]
    });
    alert('Item added!');
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setOwner('');
    setRoom('');
    setImageUrl('');
    setImage(null);
    setHighlight({ name: false, description: false, price: false });
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
        <button onClick={handleGenerateAI} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          {loading ? 'Generating...' : 'Generate with AI'}
        </button>
      )}

      {loading && <div className="text-center text-gray-600">🔄 AI is working magic...</div>}

      <input className={`w-full mb-2 border p-2 ${highlight.name ? 'border-red-500' : ''}`} value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
      <textarea className={`w-full mb-2 border p-2 ${highlight.description ? 'border-red-500' : ''}`} value={description} onChange={e => setDescription(e.target.value)} placeholder="Item Description" />
      <input className={`w-full mb-2 border p-2 ${highlight.price ? 'border-red-500' : ''}`} value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />

      <input className="w-full mb-2 border p-2" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category (e.g. Sofa, Dresser, etc.)" />

      <select className="w-full mb-2 border p-2" value={owner} onChange={e => setOwner(e.target.value)}>
        <option value="">Select Owner</option>
        {owners.map((o, i) => <option key={i} value={o}>{o}</option>)}
      </select>

      <input
        className={`w-full mb-2 border p-2 ${isNewRoom ? 'border-red-500' : ''}`}
        value={room}
        onChange={e => setRoom(e.target.value)}
        placeholder="Room"
      />
      {isNewRoom && <p className="text-sm text-red-500 mb-2">⚠️ This is a new room</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        {roomList.map((r, i) => (
          <button
            key={i}
            onClick={() => setRoom(r)}
            className={`px-2 py-1 rounded text-sm ${getRoomColor(r)}`}
          >
            {r}
          </button>
        ))}
      </div>

      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Add Item</button>
    </div>
  );
}
