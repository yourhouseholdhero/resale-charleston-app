import React, { useState } from 'react';

export default function OwnerForm({ onAddOwner }) {
  const [owner, setOwner] = useState({ name: '', phone: '', address: '', split: '' });

  const handleSubmit = () => {
    onAddOwner(owner);
    setOwner({ name: '', phone: '', address: '', split: '' });
  };

  return (
    <div>
      <input placeholder="Name" value={owner.name} onChange={e => setOwner({...owner, name: e.target.value})} />
      <input placeholder="Phone" value={owner.phone} onChange={e => setOwner({...owner, phone: e.target.value})} />
      <input placeholder="Address" value={owner.address} onChange={e => setOwner({...owner, address: e.target.value})} />
      <input placeholder="% Split" value={owner.split} onChange={e => setOwner({...owner, split: e.target.value})} />
      <button onClick={handleSubmit}>Add Owner</button>
    </div>
  );
}
