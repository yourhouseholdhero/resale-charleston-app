// EditItem.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

const db = getFirestore(app);
const storage = getStorage(app);

export default function EditItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const itemRef = doc(db, 'items', itemId);
      const snap = await getDoc(itemRef);
      if (snap.exists()) {
        setItem({ id: snap.id, ...snap.data() });
      }
      const ownerSnap = await getDocs(collection(db, 'owners'));
      setOwners(ownerSnap.docs.map(doc => doc.data().name));
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
        className="w-full mb-2 border p-2"
        placeholder="Category"
      />
      <select
        value={item.room}
        onChange={(e) => setItem({ ...item, room: e.target.value })}
        className="w-full mb-2 border p-2"
      >
        <option value="">Select Room</option>
        <option>Living Room</option>
        <option>Bedroom</option>
        <option>Dining Room</option>
        <option>Office</option>
        <option>Outdoor</option>
        <option>Other</option>
      </select>
      <select
        value={item.owner}
        onChange={(e) => setItem({ ...item, owner: e.target.value })}
        className="w-full mb-2 border p-2"
      >
        <option value="">Select Owner</option>
        {owners.map((o, i) => (
          <option key={i} value={o}>{o}</option>
        ))}
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
