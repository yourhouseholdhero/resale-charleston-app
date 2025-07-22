import React from 'react';

export default function InventoryTable({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No inventory items to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Owner</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="py-2 px-4 border-b text-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-16 mx-auto object-cover rounded" />
                ) : (
                  <span className="text-sm text-gray-400 italic">No image</span>
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">{item.name}</td>
              <td className="py-2 px-4 border-b text-center">${item.price}</td>
              <td className="py-2 px-4 border-b text-center">{item.category}</td>
              <td className="py-2 px-4 border-b text-center">{item.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
