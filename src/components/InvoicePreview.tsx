import React from 'react';

type Item = {
  name: string;
  unitPrice: number;
  quantity: number;
};

type InvoiceData = {
  date: string;
  recipient: string;
  items: Item[];
};

const InvoicePreview: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div style={{ marginTop: 32, border: '1px solid #ccc', padding: 16 }}>
      <h2>請求書プレビュー</h2>
      <div>日付: {invoiceData.date}</div>
      <div>宛名: {invoiceData.recipient}</div>
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc' }}>品名</th>
            <th style={{ border: '1px solid #ccc' }}>単価</th>
            <th style={{ border: '1px solid #ccc' }}>数量</th>
            <th style={{ border: '1px solid #ccc' }}>金額</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ border: '1px solid #ccc' }}>{item.name}</td>
              <td style={{ border: '1px solid #ccc', textAlign: 'right' }}>{item.unitPrice}</td>
              <td style={{ border: '1px solid #ccc', textAlign: 'right' }}>{item.quantity}</td>
              <td style={{ border: '1px solid #ccc', textAlign: 'right' }}>{item.unitPrice * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <div>小計: {subtotal} 円</div>
        <div>消費税(10%): {tax} 円</div>
        <div><strong>合計: {total} 円</strong></div>
      </div>
    </div>
  );
};

export default InvoicePreview;