import React from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeLabel({ itemId }) {
  const url = `https://resalechs.netlify.app/item?id=${itemId}`;

  return (
    <div className="p-4 flex flex-col items-center space-y-2">
      <QRCode value={url} size={160} />
      <p className="text-sm text-gray-700 text-center break-words w-40">{url}</p>
    </div>
  );
}
