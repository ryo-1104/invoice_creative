import React, { useRef, useState } from 'react';

function getToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

type Item = {
  name: string;
  unitPrice: number;
  quantity: number;
};

type Props = {
  onDataChange: (data: {
    date: string;
    recipient: string;
    recipientSuffix: '様' | '御中';
    name: string;
    address: string;
    tel: string;
    items: Item[];
  }) => void;
};

const InvoiceForm: React.FC<Props> = ({ onDataChange }) => {
  const [date, setDate] = useState(getToday());
  const [recipient, setRecipient] = useState('');
  const [recipientSuffix, setRecipientSuffix] = useState<'様' | '御中'>('様');
  const [items, setItems] = useState<Item[]>([{ name: '', unitPrice: 0, quantity: 1 }]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    if (field === 'name') {
      newItems[index][field] = value as string;
    } else if (field === 'unitPrice' || field === 'quantity') {
      newItems[index][field] = Number(value) as number;
    }
    setItems(newItems);
    onDataChange({ date, recipient, recipientSuffix, items: newItems, name, address, tel });
  };

  const handleAddItem = () => {
    const newItems = [...items, { name: '', unitPrice: 0, quantity: 1 }];
    setItems(newItems);
    onDataChange({ date, recipient, recipientSuffix, items: newItems, name, address, tel });
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any, key: string) => {
    setter(value);
    if (key === 'date') onDataChange({ date: value, recipient, recipientSuffix, items, name, address, tel });
    if (key === 'recipient') onDataChange({ date, recipient: value, recipientSuffix, items, name, address, tel });
  };

  React.useEffect(() => {
    onDataChange({ date, recipient, recipientSuffix, items, name, address, tel });
    // eslint-disable-next-line
  }, [date, recipient, recipientSuffix, items, name, address, tel]);

  // ラベル共通スタイル
  const labelStyle = {
    fontWeight: 700,
    fontSize: 16,
    color: '#1976d2',
    width: 70,
    minHeight: 36,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 1,
  };

  return (
    <div>
      {/* 日付セクション */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: 14,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          padding: '18px 16px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minHeight: 48
        }}
      >
        <label style={labelStyle}>日付</label>
        <input
          ref={dateInputRef}
          type="date"
          value={date}
          onChange={e => handleChange(setDate, e.target.value, 'date')}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid #d0d7e2',
            background: '#fff',
            fontSize: 15,
            height: 36,
            boxSizing: 'border-box',
            flex: 1
          }}
        />
      </div>

      {/* 宛名セクション */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: 14,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          padding: '18px 16px',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: 48
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={labelStyle}>宛名</label>
          <input
            type="text"
            value={recipient}
            onChange={e => handleChange(setRecipient, e.target.value, 'recipient')}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #d0d7e2',
              background: '#fff',
              fontSize: 15,
              height: 36,
              boxSizing: 'border-box',
              flex: 1
            }}
          />
        </div>
        {/* 「様」「御中」ボタン */}
        <div style={{ display: 'flex', gap: 16, marginTop: 8, marginLeft: 48 }}>
          <button
            type="button"
            onClick={() => setRecipientSuffix('様')}
            style={{
              background: '#fff',
              color: recipientSuffix === '様' ? '#1976d2' : '#333',
              border: recipientSuffix === '様' ? '2px solid #1976d2' : '1px solid #ddd',
              borderRadius: 24,
              padding: '8px 28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            様
          </button>
          <button
            type="button"
            onClick={() => setRecipientSuffix('御中')}
            style={{
              background: '#fff',
              color: recipientSuffix === '御中' ? '#1976d2' : '#333',
              border: recipientSuffix === '御中' ? '2px solid #1976d2' : '1px solid #ddd',
              borderRadius: 24,
              padding: '8px 28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            御中
          </button>
        </div>
      </div>

      {/* 名前・住所・電話番号セクション */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: 14,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          padding: '18px 16px',
          marginBottom: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <h3 style={{
          margin: 0,
          marginBottom: 8,
          fontWeight: 700,
          fontSize: 17,
          color: '#1976d2',
          letterSpacing: 1
        }}>
          発行者情報
        </h3>
        {/* 以下、名前・住所・電話番号フォーム */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* ラベルは空欄にして、プレースホルダーで項目名を表示 */}
          <label style={{ width: 0, padding: 0, margin: 0 }}></label>
          <input
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
              onDataChange({ date, recipient, recipientSuffix, name: e.target.value, address, tel, items });
            }}
            placeholder="名前"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #d0d7e2',
              background: '#fff',
              fontSize: 15,
              height: 36,
              boxSizing: 'border-box',
              flex: 1
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ width: 0, padding: 0, margin: 0 }}></label>
          <input
            type="text"
            value={address}
            onChange={e => {
              setAddress(e.target.value);
              onDataChange({ date, recipient, recipientSuffix, name, address: e.target.value, tel, items });
            }}
            placeholder="住所"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #d0d7e2',
              background: '#fff',
              fontSize: 15,
              height: 36,
              boxSizing: 'border-box',
              flex: 1
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ width: 0, padding: 0, margin: 0 }}></label>
          <input
            type="text"
            value={tel}
            onChange={e => {
              setTel(e.target.value);
              onDataChange({ date, recipient, recipientSuffix, name, address, tel: e.target.value, items });
            }}
            placeholder="電話番号"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #d0d7e2',
              background: '#fff',
              fontSize: 15,
              height: 36,
              boxSizing: 'border-box',
              flex: 1
            }}
          />
        </div>
      </div>

      {/* 項目セクション */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: 14,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          padding: '18px 16px',
          marginBottom: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: 17, color: '#1976d2', letterSpacing: 1 }}>項目</h3>
        {/* ヘッダー */}
        <div style={{ display: 'flex', gap: 8, fontWeight: 600, fontSize: 15, color: '#555', marginBottom: 4 }}>
          <div style={{ width: 120 }}>品名</div>
          <div style={{ width: 80, textAlign: 'right' }}>単価</div>
          <div style={{ width: 80, textAlign: 'right' }}>数量</div>
          <div style={{ width: 100, textAlign: 'right' }}>金額</div>
        </div>
        {/* 入力欄 */}
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="品名"
              value={item.name}
              onChange={e => handleItemChange(idx, 'name', e.target.value)}
              style={{
                width: 120,
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #d0d7e2',
                background: '#fff',
                fontSize: 15
              }}
            />
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              placeholder="単価"
              value={item.unitPrice}
              onChange={e => handleItemChange(idx, 'unitPrice', e.target.value)}
              style={{
                width: 80,
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #d0d7e2',
                background: '#fff',
                fontSize: 15,
                textAlign: 'right'
              }}
            />
            <input
              type="number"
              placeholder="数量"
              value={item.quantity}
              min={1}
              onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
              style={{
                width: 56, // ← ここを小さく
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #d0d7e2',
                background: '#fff',
                fontSize: 15,
                textAlign: 'right'
              }}
            />
            <div style={{
              width: 100,
              textAlign: 'right',
              fontSize: 15,
              color: '#222',
              background: '#f4f7fb',
              borderRadius: 8,
              padding: '6px 10px',
              border: '1px solid #e0e6ef'
            }}>
              {Number(item.unitPrice) * Number(item.quantity) || ''}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          style={{
            marginTop: 8,
            alignSelf: 'flex-start',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '6px 20px',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
            cursor: 'pointer'
          }}
        >
          項目を追加
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;