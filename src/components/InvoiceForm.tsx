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
  onDataChange: (data: { date: string; recipient: string; recipientSuffix: '様' | '御中'; items: Item[] }) => void;
};

const InvoiceForm: React.FC<Props> = ({ onDataChange }) => {
  const [date, setDate] = useState(getToday());
  const [recipient, setRecipient] = useState('');
  const [recipientSuffix, setRecipientSuffix] = useState<'様' | '御中'>('様');
  const [items, setItems] = useState<Item[]>([{ name: '', unitPrice: 0, quantity: 0 }]);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    if (field === 'name') {
      newItems[index][field] = value as string;
    } else if (field === 'unitPrice' || field === 'quantity') {
      newItems[index][field] = Number(value) as number;
    }
    setItems(newItems);
    onDataChange({ date, recipient, recipientSuffix, items: newItems });
  };

  const handleAddItem = () => {
    const newItems = [...items, { name: '', unitPrice: 0, quantity: 0 }];
    setItems(newItems);
    onDataChange({ date, recipient, recipientSuffix, items: newItems });
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any, key: string) => {
    setter(value);
    if (key === 'date') onDataChange({ date: value, recipient, recipientSuffix, items });
    if (key === 'recipient') onDataChange({ date, recipient: value, recipientSuffix, items });
  };

  React.useEffect(() => {
    onDataChange({ date, recipient, recipientSuffix, items });
    // eslint-disable-next-line
  }, [date, recipient, recipientSuffix, items]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label>
          日付: 
          <input
            ref={dateInputRef}
            type="date"
            value={date}
            onChange={e => handleChange(setDate, e.target.value, 'date')}
            style={{ marginLeft: 4 }}
          />
        </label>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>
          宛名: 
          <input
            type="text"
            value={recipient}
            onChange={e => handleChange(setRecipient, e.target.value, 'recipient')}
            style={{ marginLeft: 4 }}
          />
        </label>
        {/* 「様」「御中」ボタンを宛名の下に配置 */}
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
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
      <div>
        <h3>項目</h3>
        {items.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="品名"
              value={item.name}
              onChange={e => handleItemChange(idx, 'name', e.target.value)}
              style={{ width: 120, marginRight: 8 }}
            />
            <input
              type="number"
              placeholder="単価"
              value={item.unitPrice}
              onChange={e => handleItemChange(idx, 'unitPrice', e.target.value)}
              style={{ width: 80, marginRight: 8 }}
            />
            <input
              type="number"
              placeholder="数量"
              value={item.quantity}
              onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
              style={{ width: 80 }}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>項目を追加</button>
      </div>
    </div>
  );
};

export default InvoiceForm;