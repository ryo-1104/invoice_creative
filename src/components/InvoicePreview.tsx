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
  name?: string;
  address?: string;
  tel?: string;
  items: Item[];
};

const InvoicePreview: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
  // プレースホルダー用
  const placeholderStyle = { color: '#bbb' };

  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div
      style={{
        marginTop: 32,
        padding: '40px 48px',
        background: '#fff',
        borderRadius: 18,
        maxWidth: '900px',
        minWidth: '700px',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1.5px solid #e0e6ef'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}>
        <h2
          style={{
            fontWeight: 800,
            letterSpacing: 2,
            textAlign: 'center',
            margin: 0,
            fontSize: 36,
            color: '#1976d2'
          }}
        >
          請求書
        </h2>
        <span
          className="hide-on-pdf"
          style={{
            marginLeft: 22,
            padding: '6px 20px',
            fontSize: 15,
            color: '#1976d2',
            background: '#e3f0fc',
            borderRadius: 16,
            fontWeight: 700,
            display: 'inline-block',
            boxShadow: '0 1px 4px rgba(25,118,210,0.08)'
          }}
        >
          プレビュー
        </span>
      </div>
      {/* 日付・宛名・住所・電話番号 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ color: invoiceData.recipient ? '#222' : '#bbb', fontWeight: 600, fontSize: 20 }}>
            {invoiceData.recipient
              ? <>
                  {invoiceData.recipient}
                  {invoiceData.recipientSuffix && <span style={{ marginLeft: 4 }}>{invoiceData.recipientSuffix}</span>}
                </>
              : '宛名'}
          </div>
          <div style={{ color: invoiceData.address ? '#222' : '#bbb', fontSize: 15, marginTop: 6 }}>
            {invoiceData.address ? invoiceData.address : '住所'}
          </div>
          <div style={{ color: invoiceData.tel ? '#222' : '#bbb', fontSize: 15, marginTop: 2 }}>
            {invoiceData.tel ? invoiceData.tel : '電話番号'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: invoiceData.date ? '#222' : '#bbb', fontSize: 16 }}>
            {invoiceData.date ? invoiceData.date : '日付'}
          </div>
          <div style={{ color: invoiceData.name ? '#222' : '#bbb', fontSize: 16, marginTop: 10 }}>
            {invoiceData.name ? invoiceData.name : '名前'}
          </div>
        </div>
      </div>
      {/* テーブル */}
      <table style={{
        width: '100%',
        marginTop: 32,
        borderCollapse: 'separate',
        borderSpacing: 0,
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
      }}>
        <thead>
          <tr style={{ background: '#e3f0fc' }}>
            <th style={{
              padding: '14px 10px',
              fontWeight: 700,
              fontSize: 17,
              textAlign: 'left',
              borderRadius: '14px 0 0 0',
              color: '#1976d2',
              borderBottom: '2px solid #b6d2f7'
            }}>品名</th>
            <th style={{
              padding: '14px 10px',
              fontWeight: 700,
              fontSize: 17,
              textAlign: 'right',
              color: '#1976d2',
              borderBottom: '2px solid #b6d2f7'
            }}>単価</th>
            <th style={{
              padding: '14px 10px',
              fontWeight: 700,
              fontSize: 17,
              textAlign: 'right',
              color: '#1976d2',
              borderBottom: '2px solid #b6d2f7'
            }}>数量</th>
            <th style={{
              padding: '14px 10px',
              fontWeight: 700,
              fontSize: 17,
              textAlign: 'right',
              borderRadius: '0 14px 0 0',
              color: '#1976d2',
              borderBottom: '2px solid #b6d2f7'
            }}>金額</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#fff' }}>
              <td style={{
                padding: '12px 10px',
                fontSize: 16,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.name}</td>
              <td style={{
                padding: '12px 10px',
                textAlign: 'right',
                fontSize: 16,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.unitPrice}</td>
              <td style={{
                padding: '12px 10px',
                textAlign: 'right',
                fontSize: 16,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.quantity}</td>
              <td style={{
                padding: '12px 10px',
                textAlign: 'right',
                fontSize: 16,
                borderBottom: '1px solid #e0e6ef'
              }}>{item.unitPrice * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 合計 */}
      <div style={{
        marginTop: 40,
        textAlign: 'right',
        fontSize: 20,
        background: '#f0f4fa',
        padding: '20px 0 12px 0',
        borderRadius: 10,
      }}>
        <div>小計: <span style={{ fontWeight: 600 }}>{subtotal} 円</span></div>
        <div>消費税(10%): <span style={{ fontWeight: 600 }}>{tax} 円</span></div>
        <div style={{
          fontSize: 26,
          fontWeight: 800,
          marginTop: 16,
          color: '#1976d2',
          letterSpacing: 1
        }}>
          合計: {total} 円
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;