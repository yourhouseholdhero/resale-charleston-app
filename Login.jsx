import React, { useState } from 'react';

export default function Login({ setLoggedIn }) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'MaryPopp!ns1') {
      setLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
      <input
        type="password"
        className="p-2 border rounded w-full mb-2"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-green-600 text-white w-full py-2 rounded">Login</button>
    </div>
  );
}
