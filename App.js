import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [photo, setPhoto] = useState(null);
  const [salePrice, setSalePrice] = useState('');
  const [payout, setPayout] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendURL = 'https://resale-charleston-app.onrender.com';

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const analyzeRes = await axios.post(`${backendURL}/api/analyze`, {
        title
      });
      const qrRes = await axios.post(`${backendURL}/api/qrcode`, {
        title
      });
      setResult({
        ...analyzeRes.data,
        qr: qrRes.data.url,
        id: `RC-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        title,
        owner,
        intakeDate: new Date().toLocaleDateString()
      });
    } catch (err) {
      alert('Error analyzing item.');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${backendURL}/api/sync`, {
        ...result,
        salePrice,
        payout,
        profit: Number(salePrice) - Number(payout),
        paymentType,
        dateSold: new Date().toLocaleDateString()
      });
      alert('✅ Submitted to Google Sheet!');
    } catch (err) {
      alert('❌ Error submitting to Google Sheet.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-emerald-700">Resale Charleston</h1>
        <p className="text-gray-600">Find the best deals on furniture & decor!</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Item Intake</h2>
        <input
          type="text"
          placeholder="Item Title"
          className="w-full p-2 mb-3 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner Name"
          className="w-full p-2 mb-3 border rounded"
          value={owner}
          onChange={e => setOwner(e.target.value)}
        />
        <input
          type="file"
          className="w-full p-2 mb-3"
          onChange={e => setPhoto(e.target.files[0])}
        />
        <button
          onClick={handleAnalyze}
          className="bg-emerald-600 text-white w-full py-2 rounded hover:bg-emerald-700"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Item'}
        </button>

        {result && (
          <div className="mt-6">
            <div className="font-semibold text-lg">Item ID: <span className="text-gray-700">{result.id}</span></div>
            <div className="text-gray-700 mb-2">Owner: {result.owner} | Intake Date: {result.intakeDate}</div>
            <div className="border p-3 rounded bg-slate-50">
              <p><strong>Title:</strong> {result.title}</p>
              <p><strong>Description:</strong> {result.description}</p>
              <p><strong>Estimated Value:</strong> ${result.value}</p>
              <p><strong>Tags:</strong> {result.tags?.join(', ')}</p>
              <p><strong>QR Link:</strong> <a href={result.qr} className="text-blue-600 underline" target="_blank">{result.qr}</a></p>
            </div>

            <input
              type="text"
              placeholder="Sale Price"
              className="w-full p-2 my-2 border rounded"
              value={salePrice}
              onChange={e => setSalePrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Owner Payout"
              className="w-full p-2 my-2 border rounded"
              value={payout}
              onChange={e => setPayout(e.target.value)}
            />
            <input
              type="text"
              placeholder="Payment Type (Cash, Venmo...)"
              className="w-full p-2 my-2 border rounded"
              value={paymentType}
              onChange={e => setPaymentType(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Item to Sheet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
