import React, { useState, useEffect } from 'react';
import { addItem, getOwners, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ROOMS = ['Living Room', 'Bedroom', 'Kitchen', 'Dining Room', 'Office', 'Outdoor', 'Garage', 'Other'];

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', room: '', owner: '', images: []
  });
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOwners = async () => {
      const data = await getOwners();
      setOwners(data);
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, owner, room, images } = formData;
    if (!name || !price || !owner || !room) return alert('Required fields missing');
    setLoading(true);

    try {
      const urls = [];
      for (const file of images) {
        const storageRef = ref(storage, `items/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }
      const itemData = { ...formData, images: urls, createdAt: Date.now() };
      await addItem(itemData);
      alert('Item added!');
      setFormData({ name: '', description: '', price: '', category: '', room: '', owner: '', images: [] });
    } catch (err) {
      alert('Error uploading item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="w-full p-2 border rounded" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" className="w-full p-2 border rounded" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />

      <select name="room" value={formData.room} onChange={handleChange} className="w-full p-2 border rounded" required>
        <option value="">Select Room</option>
        {ROOMS.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>

      <select name="owner" value={formData.owner} onChange={handleChange} className="w-full p-2 border rounded" required>
        <option value="">Select Owner</option>
        {owners.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>

      <input name="images" type="file" onChange={handleChange} multiple className="w-full p-2 border rounded" />

      <button disabled={loading} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {loading ? 'Uploading...' : 'Add Item'}
      </button>
    </form>
  );
}
