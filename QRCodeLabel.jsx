import React from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeLabel({ itemId }) {
  if (!itemId) return null;
  const url = `https://resalechs.netlify.app/item?id=${itemId}`;

  const downloadQRCode = () => {
    const canvas = document.getElementById(`qr-${itemId}`);
    if (!canvas) return alert("QR code not found");
    try {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${itemId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      alert("Failed to download QR code");
      console.error(err);
    }
  };

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Print QR</title></head><body style="text-align:center;padding:2rem">`);
    printWindow.document.write(`<img src="${document.getElementById(`qr-${itemId}`).toDataURL()}" />`);
    printWindow.document.write(`</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-2">
      <QRCode id={`qr-${itemId}`} value={url} size={160} includeMargin={true} />
      <p className="text-sm text-gray-700 text-center break-words w-40">{url}</p>
      <div className="flex space-x-2">
        <button onClick={downloadQRCode} className="text-xs px-3 py-1 bg-blue-500 text-white rounded">Download QR</button>
        <button onClick={printQRCode} className="text-xs px-3 py-1 bg-green-500 text-white rounded">Print QR</button>
        <button onClick={copyLink} className="text-xs px-3 py-1 bg-gray-600 text-white rounded">Copy Link</button>
      </div>
    </div>
  );
}
