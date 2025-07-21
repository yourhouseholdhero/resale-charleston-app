import React from 'react';

export default function InventoryTable({ inventory, onEdit, onDelete }) {
  if (!Array.isArray(inventory)) {
    return <div className="text-red-600">Invalid inventory data.</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">${item.price}</td>
              <td className="border px-4 py-2">{item.owner}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(index)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
