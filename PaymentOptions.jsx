import React from 'react';

export default function PaymentOptions({ paymentType, setPaymentType }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold">Payment Method:</label>
      <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
        <option>Cash</option>
        <option>Card</option>
        <option>Venmo</option>
      </select>
    </div>
  );
}
