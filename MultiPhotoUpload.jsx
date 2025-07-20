import React, { useState } from 'react';

export default function MultiPhotoUpload({ photos, setPhotos }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setPhotos(files);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Upload up to 10 photos:</label>
      <input type="file" multiple accept="image/*" onChange={handleUpload} />
    </div>
  );
}
