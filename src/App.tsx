import React, { useRef, useState } from 'react';
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
    const [formOpen, setFormOpen] = useState(false);
    const printAreaRef = useRef<HTMLDivElement>(null);

    const handleDataChange = (data: InvoiceData) => setInvoiceData(data);

    return (
        <div className="app-root" style={{ position: 'relative', minHeight: '100vh', background: '#f5f5f5' }}>
            {/* タイトル */}
            <div style={{ width: '100%', textAlign: 'center', margin: '32px 0 24px 0' }}>
                <h1 style={{ fontSize: 32, margin: 0, letterSpacing: 2 }}>請求書作成</h1>
            </div>
            {/* プレビュー左寄せ・画面いっぱい */}
            <div style={{
                width: '100%',
                minHeight: 'calc(100vh - 120px)',
                background: '#fff',
            }}>
                <InvoicePreview invoiceData={invoiceData} />
            </div>
            {/* 右端中央のスライドインボタン */}
            {!formOpen && (
                <button
                    className="slide-open-btn"
                    onClick={() => setFormOpen(true)}
                    aria-label="フォームを開く"
                    type="button"
                >
                    ◀
                </button>
            )}
            {/* 右側フォーム（スライドイン） */}
            <div className={`slide-form${formOpen ? ' open' : ''}`}>
                {formOpen && (
                    <button
                        className="slide-close-btn"
                        onClick={() => setFormOpen(false)}
                        aria-label="フォームを閉じる"
                        type="button"
                    >
                        ▶
                    </button>
                )}
                <InvoiceForm onDataChange={handleDataChange} />
            </div>
        </div>
    );
};

export default App;

