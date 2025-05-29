import React from 'react';

type Item = {
  name: string;
  unitPrice: number;
  quantity: number;
};

type InvoiceData = {
  date: string;
  recipient: string;
  recipientSuffix: '様' | '御中';
  items: Item[];
};

const InvoicePreview: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div style={{ marginTop: 32, padding: 16 }}>
      <h2
        style={{
          marginBottom: 24,
          fontWeight: 700,
          letterSpacing: 2,
          textAlign: 'center'
        }}
      >
        請求書プレビュー
      </h2>
      <div style={{ marginBottom: 8, textAlign: 'right' }}>日付 {invoiceData.date}</div>
      <div style={{ marginBottom: 16 }}>
        宛名 {invoiceData.recipient}
        {invoiceData.recipient && invoiceData.recipientSuffix ? (
          <span style={{ marginLeft: 4 }}>{invoiceData.recipientSuffix}</span>
        ) : null}
      </div>
      {/* ここから追加 */}
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <div>名前</div>
        <div>住所</div>
        <div>電話番号</div>
      </div>
      {/* ここまで追加 */}
      <table style={{ width: '100%', marginTop: 8, borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: '#f0f4fa' }}>
            <th style={{
              padding: '10px 8px',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'left',
              borderRadius: '8px 0 0 0'
            }}>品名</th>
            <th style={{
              padding: '10px 8px',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'right'
            }}>単価</th>
            <th style={{
              padding: '10px 8px',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'right'
            }}>数量</th>
            <th style={{
              padding: '10px 8px',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'right',
              borderRadius: '0 8px 0 0'
            }}>金額</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
              <td style={{
                padding: '8px 8px',
                fontSize: 15,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.name}</td>
              <td style={{
                padding: '8px 8px',
                textAlign: 'right',
                fontSize: 15,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.unitPrice}</td>
              <td style={{
                padding: '8px 8px',
                textAlign: 'right',
                fontSize: 15,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.quantity}</td>
              <td style={{
                padding: '8px 8px',
                textAlign: 'right',
                fontSize: 15,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.unitPrice * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 24, textAlign: 'right', fontSize: 16 }}>
        <div>小計: <span style={{ fontWeight: 500 }}>{subtotal} 円</span></div>
        <div>消費税(10%): <span style={{ fontWeight: 500 }}>{tax} 円</span></div>
        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>
          合計: {total} 円
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;