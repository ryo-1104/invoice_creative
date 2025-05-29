import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import './styles/App.css';

type InvoiceData = {
    date: string;
    recipient: string;
    recipientSuffix: '様' | '御中';
    items: { name: string; unitPrice: number; quantity: number }[];
};

const App: React.FC = () => {
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
        date: '',
        recipient: '',
        recipientSuffix: '様',
        items: [{ name: '', unitPrice: 0, quantity: 0 }],
    });

    const handleDataChange = (data: InvoiceData) => {
        setInvoiceData(data);
    };

    return (
        <div style={{ height: '100vh', boxSizing: 'border-box', background: '#f5f5f5' }}>
            {/* タイトル中央配置 */}
            <div style={{ width: '100%', textAlign: 'center', margin: '32px 0 24px 0' }}>
                <h1 style={{ fontSize: 32, margin: 0, letterSpacing: 2 }}>請求書作成</h1>
            </div>
            {/* 2カラムレイアウト */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: 'calc(100vh - 120px)',
                padding: '0 32px 32px 32px',
                boxSizing: 'border-box',
                gap: 24,
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                {/* 左側：プレビュー（3分の2） */}
                <div style={{
                    flex: 2,
                    background: '#fff',
                    padding: '32px 24px',
                    borderRadius: 12,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08)',
                    minWidth: 0
                }}>
                    <InvoicePreview invoiceData={invoiceData} />
                </div>
                {/* 右側：フォーム（3分の1） */}
                <div style={{
                    flex: 1,
                    background: '#fff',
                    padding: 16,
                    borderRadius: 8,
                    boxShadow: '0 0 8px #eee',
                    minWidth: 0
                }}>
                    <InvoiceForm onDataChange={handleDataChange} />
                </div>
            </div>
        </div>
    );
};

export default App;