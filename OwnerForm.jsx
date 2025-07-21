import React from 'react';

export default function OwnerForm({ form, onChange, onSubmit, editing }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 space-y-3">
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Owner Name"
        className="border p-2 w-full"
        required
      />
      <input
        name="contact"
        value={form.contact}
        onChange={onChange}
        placeholder="Contact Info"
        className="border p-2 w-full"
      />
      <input
        name="image"
        value={form.image}
        onChange={onChange}
        placeholder="Image URL"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editing ? 'Update Owner' : 'Add Owner'}
      </button>
    </form>
  );
}
