import React, { useState, useEffect } from 'react';
import { uploadImage, saveItem, getOwners, getRooms } from './firebase';

export default function AddItem() {
  const [item, setItem] = useState({ name: '', description: '', price: '', owner: '', room: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ownerList = await getOwners();
      const roomList = await getRooms();
      setOwners(ownerList);
      setRooms(roomList);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!image) return alert("Upload an image first");
    setLoading(true);
    const url = await uploadImage(image);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          { role: "user", content: [
            { type: "text", text: "Describe this furniture item. Estimate resale price." },
            { type: "image_url", image_url: { url } }
          ] }
        ],
        max_tokens: 300
      })
    });
    const result = await response.json();
    const text = result.choices[0].message.content;
    const [nameLine, descriptionLine, priceLine] = text.split('\n');

    setItem({
      ...item,
      name: nameLine.replace("Name:", '').trim(),
      description: descriptionLine.replace("Description:", '').trim(),
      price: priceLine.replace(/[^\d.]/g, '').trim()
    });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imgUrl = image ? await uploadImage(image) : '';
    await saveItem({ ...item, images: [imgUrl] });
    alert("Item saved");
    setLoading(false);
    setItem({ name: '', description: '', price: '', owner: '', room: '' });
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
      <input name="name" value={item.name} onChange={handleChange} placeholder="Item Name" className="w-full border p-2" />
      <textarea name="description" value={item.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />
      <input name="price" value={item.price} onChange={handleChange} placeholder="Price" className="w-full border p-2" />

      <select name="owner" value={item.owner} onChange={handleChange} className="w-full border p-2">
        <option value="">Select Owner</option>
        {owners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
      </select>

      <select name="room" value={item.room} onChange={handleChange} className="w-full border p-2">
        <option value="">Select Room</option>
        {rooms.map(room => <option key={room} value={room}>{room}</option>)}
      </select>

      <input type="file" onChange={handleImageUpload} className="w-full" />
      <button type="button" onClick={handleAnalyze} className="bg-yellow-500 px-4 py-2 text-white rounded" disabled={loading}>Analyze Image</button>
      <button type="submit" className="bg-green-600 px-4 py-2 text-white rounded" disabled={loading}>Add Item</button>
    </form>
  );
}
