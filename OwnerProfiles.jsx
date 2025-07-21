import React from 'react';

export default function OwnerProfiles() {
  const owners = [
    { name: 'Alice Walker', contact: 'alice@example.com' },
    { name: 'Bob Jones', contact: 'bob@example.com' },
    { name: 'Cynthia Ray', contact: 'cynthia@example.com' }
  ];

  return (
    <div>
      <h2>Owner Profiles</h2>
      <ul>
        {owners.map((owner, index) => (
          <li key={index}>
            <strong>{owner.name}</strong> - {owner.contact}
          </li>
        ))}
      </ul>
    </div>
  );
}
