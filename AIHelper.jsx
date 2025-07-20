import React from 'react';

export default function AIHelper({ title, setAnalysis }) {
  const handleAnalyze = async () => {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const data = await res.json();
    setAnalysis(data);
  };

  return <button onClick={handleAnalyze} className="bg-blue-600 text-white py-2 px-4 rounded">Analyze with AI</button>;
}
