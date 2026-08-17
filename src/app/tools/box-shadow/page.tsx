"use client";

import { useState } from "react";
import SmartBanner from "@/components/SmartBanner";

export default function BoxShadowPage() {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("0, 0, 0");
  const [opacity, setOpacity] = useState(0.2);
  const [inset, setInset] = useState(false);
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#1a1a2e");

  const [copied, setCopied] = useState(false);

  const cssValue = `${inset ? "inset " : ""}${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${color}, ${opacity})`;
  const cssCode = `box-shadow: ${cssValue};\n-webkit-box-shadow: ${cssValue};\n-moz-box-shadow: ${cssValue};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hexToRgbString = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>CSS Box Shadow Generator</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Visually design perfect CSS box shadows and instantly copy the code for your web projects.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* Controls */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3>Shadow Settings</h3>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Horizontal Offset</label>
              <span>{hOffset}px</span>
            </div>
            <input type="range" min="-100" max="100" value={hOffset} onChange={(e) => setHOffset(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Vertical Offset</label>
              <span>{vOffset}px</span>
            </div>
            <input type="range" min="-100" max="100" value={vOffset} onChange={(e) => setVOffset(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Blur Radius</label>
              <span>{blur}px</span>
            </div>
            <input type="range" min="0" max="150" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Spread Radius</label>
              <span>{spread}px</span>
            </div>
            <input type="range" min="-100" max="100" value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Opacity</label>
              <span>{opacity}</span>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input type="checkbox" id="inset" checked={inset} onChange={(e) => setInset(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem' }} />
            <label htmlFor="inset">Inset (Inner Shadow)</label>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0' }} />
          
          <h3>Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Shadow Color</label>
              <input type="color" defaultValue="#000000" onChange={(e) => setColor(hexToRgbString(e.target.value))} style={{ width: '100%', height: '40px', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Box Color</label>
              <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} style={{ width: '100%', height: '40px', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: '40px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Live Preview Area */}
          <div style={{ 
            flex: 1, 
            background: bgColor, 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              backgroundColor: boxColor,
              boxShadow: cssValue,
              borderRadius: '16px'
            }}></div>
          </div>

          {/* CSS Code Output */}
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>CSS Code</h3>
            <pre style={{ 
              background: 'rgba(0,0,0,0.3)', 
              padding: '1rem', 
              borderRadius: '8px', 
              overflowX: 'auto',
              color: '#38bdf8',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              <code>{cssCode}</code>
            </pre>
            <button 
              className={`btn ${copied ? 'btn-primary' : 'btn-outline'}`}
              onClick={handleCopy}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

        </div>

      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="developer" />
      </div>
      
      <article style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mastering the CSS Box Shadow Property</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          The <code>box-shadow</code> CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radius, and color.
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <li><strong>Horizontal Offset (X):</strong> Positive values push the shadow right, negative values push it left.</li>
          <li><strong>Vertical Offset (Y):</strong> Positive values push the shadow down, negative values push it up.</li>
          <li><strong>Blur Radius:</strong> Higher values create a larger, more blurred shadow. Cannot be negative.</li>
          <li><strong>Spread Radius:</strong> Positive values cause the shadow to expand, negative values cause it to shrink.</li>
          <li><strong>Inset:</strong> Changes the shadow from an outer drop-shadow to an inner shadow.</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Using our visual generator eliminates the guesswork, allowing you to instantly see how different parameter combinations affect the final look of your UI components.
        </p>
      </article>

      <style dangerouslySetInnerHTML={{__html: `
        input[type=range] {
          -webkit-appearance: none;
          background: rgba(255,255,255,0.1);
          height: 6px;
          border-radius: 3px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent-primary);
          cursor: pointer;
        }
      `}} />
    </div>
  );
}
