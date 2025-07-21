import React from 'react';

export default function OwnerCard({ owner, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{owner.name}</h3>
        <p>{owner.contact}</p>
        {owner.image && (
          <img
            src={owner.image}
            alt={owner.name}
            className="h-20 w-20 object-cover mt-2"
          />
        )}
      </div>
      <div className="space-x-2">
        <button onClick={onEdit} className="text-yellow-600">Edit</button>
        <button onClick={onDelete} className="text-red-600">Delete</button>
      </div>
    </div>
  );
}
