import React, { useRef, useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import './styles/App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    const printAreaRef = useRef<HTMLDivElement>(null);

    const handleDataChange = (data: InvoiceData) => {
        setInvoiceData(data);
    };

    // PDF保存処理
    const handleSavePdf = async () => {
        if (!printAreaRef.current) return;

        // 「プレビュー」非表示
        const previewLabels = printAreaRef.current.querySelectorAll('.hide-on-pdf');
        previewLabels.forEach(el => (el as HTMLElement).style.display = 'none');

        const canvas = await html2canvas(printAreaRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth - margin * 2;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', margin, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');

        // 「プレビュー」再表示
        previewLabels.forEach(el => (el as HTMLElement).style.display = '');
    };

    return (
        <div className="print-root" style={{ height: '100vh', boxSizing: 'border-box', background: '#f5f5f5' }}>
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
                {/* 左側：プレビュー */}
                <div style={{
                    flex: 2,
                    background: '#fff',
                    padding: '32px 24px',
                    borderRadius: 12,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08)',
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div className="print-area" ref={printAreaRef}>
                        <InvoicePreview invoiceData={invoiceData} />
                    </div>
                    {/* 保存ボタン */}
                    <div style={{ marginTop: 32, textAlign: 'right' }}>
                        <button
                            type="button"
                            onClick={handleSavePdf}
                            style={{
                                padding: '8px 32px',
                                fontSize: 16,
                                background: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
                            }}
                        >
                            保存
                        </button>
                    </div>
                </div>
                {/* 右側：フォーム */}
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
            {/* InvoicePreviewやApp.tsx内の「プレビュー」部分 */}
            <span className="hide-on-pdf">プレビュー</span>
        </div>
    );
};

export default App;

