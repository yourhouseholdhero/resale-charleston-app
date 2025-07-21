import React, { useState } from 'react';

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');

  function handleLogin() {
    if (input === 'adminpass') setAuthenticated(true);
  }

  return authenticated ? (
    <div>Welcome Admin</div>
  ) : (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}