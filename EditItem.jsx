// src/components/EditItem.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

const db = getFirestore(app);
const storage = getStorage(app);

const getCategoryColor = (category) => {
  const map = {
    Sofa: 'bg-purple-100 text-purple-800',
    Dresser: 'bg-green-100 text-green-800',
    Chair: 'bg-blue-100 text-blue-800',
    Table: 'bg-yellow-100 text-yellow-800',
    Bed: 'bg-red-100 text-red-800',
  };
  return map[category] || 'bg-gray-100 text-gray-800';
};

const getRoomColor = (room) => {
  const map = {
    'Living Room': 'bg-orange-100 text-orange-800',
    Bedroom: 'bg-pink-100 text-pink-800',
    'Dining Room': 'bg-teal-100 text-teal-800',
    Office: 'bg-indigo-100 text-indigo-800',
    Outdoor: 'bg-green-100 text-green-800',
    Other: 'bg-gray-200 text-gray-700'
  };
  return map[room] || 'bg-gray-100 text-gray-800';
};

export default function EditItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [roomList, setRoomList] = useState([
    'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor', 'Other'
  ]);

  useEffect(() => {
    async function fetchData() {
      const itemRef = doc(db, 'items', itemId);
      const snap = await getDoc(itemRef);
      if (snap.exists()) {
        setItem({ id: snap.id, ...snap.data() });
      }

      const ownerSnap = await getDocs(collection(db, 'owners'));
      setOwners(ownerSnap.docs.map(doc => doc.data().name));

      const allItemsSnap = await getDocs(collection(db, 'items'));
      const cats = Array.from(new Set(allItemsSnap.docs.map(d => d.data().category).filter(Boolean)));
      setCategories(cats);

      setLoading(false);
    }
    fetchData();
  }, [itemId]);

  const handleImageUpload = async (file) => {
    const imageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSave = async () => {
    if (!item.name || !item.price || !item.owner || !item.room) return alert('Missing required fields!');
    const itemRef = doc(db, 'items', itemId);
    const updatedData = { ...item };
    if (imageFile) {
      const newImageUrl = await handleImageUpload(imageFile);
      updatedData.image = newImageUrl;
    }
    await updateDoc(itemRef, updatedData);
    alert('Item updated!');
    navigate(`/owner/${item.owner}`);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6 text-red-600">Item not found.</div>;

  const isNewCategory = item.category && !categories.includes(item.category);
  const isNewRoom = item.room && !roomList.includes(item.room);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>

      <input
        type="text"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        className="w-full mb-2 border p-2"
        placeholder="Item Name"
      />
      <textarea
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
        className="w-full mb-2 border p-2"
        placeholder="Description"
      />
      <input
        type="number"
        value={item.price}
        onChange={(e) => setItem({ ...item, price: e.target.value })}
        className="w-full mb-2 border p-2"
        placeholder="Price"
      />

      <input
        type="text"
        value={item.category || ''}
        onChange={(e) => setItem({ ...item, category: e.target.value })}
        className={`w-full mb-2 border p-2 ${isNewCategory ? 'border-red-500' : ''}`}
        placeholder="Category"
      />
      {isNewCategory && <p className="text-sm text-red-500 mb-2">⚠️ This is a new category</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setItem({ ...item, category: cat })}
            className={`px-2 py-1 rounded text-sm ${getCategoryColor(cat)}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={item.room || ''}
        onChange={(e) => setItem({ ...item, room: e.target.value })}
        className={`w-full mb-2 border p-2 ${isNewRoom ? 'border-red-500' : ''}`}
        placeholder="Room"
      />
      {isNewRoom && <p className="text-sm text-red-500 mb-2">⚠️ This is a new room</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        {roomList.map((r, i) => (
          <button
            key={i}
            onClick={() => setItem({ ...item, room: r })}
            className={`px-2 py-1 rounded text-sm ${getRoomColor(r)}`}
          >
            {r}
          </button>
        ))}
      </div>

      <select
        value={item.owner}
        onChange={(e) => setItem({ ...item, owner: e.target.value })}
        className="w-full mb-2 border p-2"
      >
        <option value="">Select Owner</option>
        {owners.map((o, i) => <option key={i} value={o}>{o}</option>)}
      </select>

      <select
        value={item.status}
        onChange={(e) => setItem({ ...item, status: e.target.value })}
        className="w-full mb-4 border p-2"
      >
        <option value="In Inventory">In Inventory</option>
        <option value="Sold">Sold</option>
        <option value="Pending">Pending</option>
      </select>

      <label className="block mb-2">Update Image (optional)</label>
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="mb-4" />

      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
    </div>
  );
}
