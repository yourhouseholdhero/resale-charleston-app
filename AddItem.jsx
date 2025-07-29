import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export default function AddItem() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      const snapshot = await getDocs(collection(db, 'owners'));
      setOwners(snapshot.docs.map(doc => doc.data().name));
    };
    fetchOwners();
  }, []);

  const handleImageUpload = async (file) => {
    const storage = getStorage(app);
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
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
    } catch (err) {
      alert(`Error: ${err.message}`);
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
    setOwner('');
    setRoom('');
    setImageUrl('');
    setImage(null);
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

      <input className="w-full mb-2 border p-2" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
      <textarea className="w-full mb-2 border p-2" value={description} onChange={e => setDescription(e.target.value)} placeholder="Item Description" />
      <input className="w-full mb-2 border p-2" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />

      <select className="w-full mb-2 border p-2" value={owner} onChange={e => setOwner(e.target.value)}>
        <option value="">Select Owner</option>
        {owners.map((o, i) => <option key={i} value={o}>{o}</option>)}
      </select>

      <select className="w-full mb-4 border p-2" value={room} onChange={e => setRoom(e.target.value)}>
        <option value="">Select Room</option>
        <option value="Living Room">Living Room</option>
        <option value="Bedroom">Bedroom</option>
        <option value="Dining Room">Dining Room</option>
        <option value="Office">Office</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Other">Other</option>
      </select>

      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Add Item</button>
    </div>
  );
}
