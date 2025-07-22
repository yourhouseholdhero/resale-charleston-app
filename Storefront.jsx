import React from 'react';

export default function Storefront() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome to Resale Charleston</h2>
      <p className="text-center text-gray-600 mb-8">
        Find the best deals on furniture and decor. Explore our current inventory and specials.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">Living Room Sets</h3>
          <p className="text-sm text-gray-600">Cozy and elegant arrangements at unbeatable prices.</p>
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">Bedroom Collections</h3>
          <p className="text-sm text-gray-600">Stylish and comfy options for restful nights.</p>
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">Kitchen & Dining</h3>
          <p className="text-sm text-gray-600">Functional and beautiful dining sets & decor.</p>
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">Special Finds</h3>
          <p className="text-sm text-gray-600">One-of-a-kind treasures added daily!</p>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400">
        Visit us in-store or follow us for more updates!
      </div>
    </div>
  );
}
