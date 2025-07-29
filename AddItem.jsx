import React, { useState } from 'react';
import axios from 'axios';
import { addItemToDatabase } from './firebase';

export default function AddItem() {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [aiLoading, setAiLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const generateAI = async () => {
    if (!imageFile) return;
    setAiLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        const response = await axios.post('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base', {
          inputs: base64Image
        }, {
          headers: {
            Authorization: `Bearer YOUR_HUGGINGFACE_TOKEN`,
            'Content-Type': 'application/json'
          }
        });
        const caption = response.data[0].generated_text;
        setFormData({
          name: caption.split(' ').slice(0, 5).join(' '),
          description: caption,
          price: (Math.random() * 100 + 50).toFixed(2)
        });
      } catch (error) {
        console.error('AI error:', error);
      } finally {
        setAiLoading(false);
      }
    };
    reader.readAsDataURL(imageFile);
  };

  const saveItem = async () => {
    setSaving(true);
    try {
      await addItemToDatabase({
        ...formData,
        imageUrl: previewUrl
      });
      alert('Item saved!');
      setFormData({ name: '', description: '', price: '' });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="mb-4" />
      {previewUrl && <img src={previewUrl} alt="Preview" className="mb-4 w-full h-64 object-cover rounded" />}

      <button onClick={generateAI} disabled={aiLoading} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        {aiLoading ? 'Analyzing Image...' : 'Generate Item Info'}
      </button>

      <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="block w-full mb-2 p-2 border" />
      <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="block w-full mb-2 p-2 border"></textarea>
      <input type="text" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="block w-full mb-4 p-2 border" />

      <button onClick={saveItem} disabled={saving} className="bg-green-600 text-white px-4 py-2 rounded">
        {saving ? 'Saving...' : 'Save Item'}
      </button>
    </div>
  );
}
