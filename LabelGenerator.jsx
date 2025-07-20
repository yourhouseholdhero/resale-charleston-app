import React from 'react';
import QRCode from 'qrcode.react';

export default function LabelGenerator({ link }) {
  return (
    <div className="text-center mt-4">
      <QRCode value={link} />
      <p className="text-sm">{link}</p>
    </div>
  );
}
