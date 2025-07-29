import React from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeLabel({ itemId }) {
  if (!itemId) return null;
  const url = `https://resalechs.netlify.app/item?id=${itemId}`;

  const downloadQRCode = () => {
    const canvas = document.getElementById(`qr-${itemId}`);
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-${itemId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-2">
      <QRCode id={`qr-${itemId}`} value={url} size={160} includeMargin={true} />
      <p className="text-sm text-gray-700 text-center break-words w-40">{url}</p>
      <button onClick={downloadQRCode} className="text-xs px-3 py-1 bg-blue-500 text-white rounded">Download QR</button>
    </div>
  );
}
