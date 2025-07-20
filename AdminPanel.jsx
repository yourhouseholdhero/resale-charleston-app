
import React, { useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [ownerType, setOwnerType] = useState('resale');
  const [percentSplit, setPercentSplit] = useState('');
  const [pricePaid, setPricePaid] = useState('');
  const [photos, setPhotos] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    setPhotos(Array.from(e.target.files).slice(0, 10));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const analyzeRes = await axios.post('https://resale-charleston-app.onrender.com/api/analyze', {
        title
      });
      setResult({
        ...analyzeRes.data,
        title,
        ownerType,
        percentSplit,
        pricePaid,
        photos,
        intakeDate: new Date().toLocaleDateString()
      });
    } catch (err) {
      alert('Error analyzing item.');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://resale-charleston-app.onrender.com/api/items', {
        ...result
      });
      alert('✅ Submitted to inventory!');
    } catch (err) {
      alert('❌ Error submitting item.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Intake Form</h2>
      <input
        type="text"
        placeholder="Item Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <div className="mb-2">
        <label className="mr-2">Owner Type:</label>
        <select value={ownerType} onChange={e => setOwnerType(e.target.value)} className="p-1 border rounded">
          <option value="resale">Resale Charleston</option>
          <option value="consignor">Consignor</option>
        </select>
      </div>
      {ownerType === 'consignor' ? (
        <input
          type="number"
          placeholder="Consignor % Split (e.g. 50)"
          value={percentSplit}
          onChange={e => setPercentSplit(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
      ) : (
        <input
          type="number"
          placeholder="Price Paid by Resale Charleston"
          value={pricePaid}
          onChange={e => setPricePaid(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
      )}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
        className="w-full mb-2"
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full mb-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Analyzing...' : 'Analyze Item'}
      </button>

      {result && (
        <div className="bg-gray-100 p-3 rounded">
          <h3 className="font-bold mb-2">AI Results:</h3>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Estimated Value:</strong> ${result.value}</p>
          <p><strong>Tags:</strong> {result.tags?.join(', ')}</p>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Item to Inventory
          </button>
        </div>
      )}
    </div>
  );
}
