import React, { useState } from 'react';

export default function AddItem() {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [percent, setPercent] = useState('');

  return (
    <form>
      <h2>Item Intake</h2>
      <input placeholder="Item Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Owner Name" value={owner} onChange={e => setOwner(e.target.value)} />
      <input placeholder="Owner's % Split" value={percent} onChange={e => setPercent(e.target.value)} />
      <input type="file" />
      <button type="submit">Submit</button>
    </form>
  );
}