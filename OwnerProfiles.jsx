import React, { useState } from 'react';

export default function OwnerProfiles({ owners }) {
  const [selectedOwner, setSelectedOwner] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">Owner Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {owners.map((owner, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow hover:bg-slate-50 cursor-pointer"
            onClick={() => setSelectedOwner(owner)}
          >
            <h3 className="text-lg font-semibold">{owner.firstName} {owner.lastName}</h3>
            <p>{owner.email}</p>
            <p>{owner.phone}</p>
            <p><strong>Split:</strong> {owner.split}%</p>
          </div>
        ))}
      </div>

      {selectedOwner && (
        <div className="mt-6 bg-white p-4 rounded shadow border">
          <h3 className="text-lg font-bold mb-2">Items from {selectedOwner.firstName}</h3>
          {selectedOwner.items && selectedOwner.items.length > 0 ? (
            <div className="space-y-2">
              {selectedOwner.items.map((item, i) => (
                <div key={i} className="border p-3 rounded bg-gray-50">
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Sold:</strong> {item.sold ? 'Yes' : 'No'}</p>
                  {item.sold && <p><strong>Sold Price:</strong> ${item.soldPrice}</p>}
                  <p><strong>Owed:</strong> ${item.owed}</p>
                  <p><strong>Paid:</strong> {item.paid ? '✅' : '❌'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items linked to this owner.</p>
          )}
        </div>
      )}
    </div>
  );
}
