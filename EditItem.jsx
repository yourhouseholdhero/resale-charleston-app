import React, { useEffect, useState } from 'react';
import { updateItem, getOwners, getRooms } from './firebase';
import { Toaster, toast } from 'react-hot-toast';

export default function EditItem({ selectedItem, onClose }) {
  const [item, setItem] = useState(selectedItem);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Updating item...");
    await updateItem(item);
    toast.dismiss();
    toast.success("Item updated successfully!");
    onClose();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button type="submit" className="bg-blue-600 px-4 py-2 text-white rounded">Update Item</button>
        <button type="button" onClick={onClose} className="ml-2 text-gray-600">Cancel</button>
      </form>
    </div>
  );
}
