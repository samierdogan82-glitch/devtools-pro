"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import SmartBanner from "@/components/SmartBanner";

export default function QRGeneratorPage() {
  const [text, setText] = useState("https://devtools-pro.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#0a0f1c");
  const [includeLogo, setIncludeLogo] = useState(false);
  
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Smart QR Code Generator</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Editor Side */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="qr-text" className="input-label">URL or Text</label>
            <textarea 
              id="qr-text"
              className="input-field" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL, Wi-Fi password, or any text..."
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="fg-color" className="input-label">Foreground Color</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input 
                  type="color" 
                  id="fg-color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  style={{ width: '50px', height: '50px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
                />
                <span style={{ fontFamily: 'monospace' }}>{fgColor}</span>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <label htmlFor="bg-color" className="input-label">Background Color</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input 
                  type="color" 
                  id="bg-color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{ width: '50px', height: '50px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
                />
                <span style={{ fontFamily: 'monospace' }}>{bgColor}</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="qr-size" className="input-label">Size: {size}px</label>
            </div>
            <input 
              id="qr-size"
              type="range" 
              min="128" 
              max="512" 
              step="32"
              value={size} 
              onChange={(e) => setSize(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', margin: '1rem 0' }}
            />
          </div>
          
          <label htmlFor="inc-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input id="inc-logo" type="checkbox" checked={includeLogo} onChange={(e) => setIncludeLogo(e.target.checked)} />
            Include Example Logo Centerpiece
          </label>
        </div>

        {/* Preview Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Preview</h3>
            
            <div 
              ref={qrRef}
              style={{ 
                padding: '1rem', 
                background: bgColor, 
                borderRadius: '12px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                border: '1px solid var(--glass-border)'
              }}
            >
              <QRCodeCanvas 
                value={text || " "} 
                size={size > 300 ? 300 : size} // Scale down visually if it's too big, actual download handles real size
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={false}
                imageSettings={
                  includeLogo ? {
                    src: "/favicon.ico",
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  } : undefined
                }
              />
            </div>
            
            <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={downloadQR}>
              Download High-Res PNG
            </button>
          </div>

          <SmartBanner type="ecommerce" />
        </div>
      </div>
      
      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>How to Use the Free QR Code Generator</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          QR Codes (Quick Response Codes) are two-dimensional barcodes that can be easily read by most modern smartphones. They are the perfect bridge between offline marketing and digital content. Our Smart QR Code Generator allows you to create customized, high-resolution QR codes in seconds, completely free and directly in your browser.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <strong>Privacy First:</strong> Your text and links are converted into a QR code using local processing. We do not store or track the data you put into your QR codes, ensuring 100% privacy and security for you and your clients.
        </p>
      </article>
    </div>
  );
}
