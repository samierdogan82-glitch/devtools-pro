"use client";

import { useState, useEffect } from "react";
import SmartBanner from "@/components/SmartBanner";

export default function GlassmorphismGeneratorPage() {
  const [blur, setBlur] = useState(16);
  const [transparency, setTransparency] = useState(0.2);
  const [outline, setOutline] = useState(0.1);
  const [color, setColor] = useState("#ffffff");
  
  const [cssCode, setCssCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Convert hex to rgb for rgba usage
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  };

  useEffect(() => {
    const rgb = hexToRgb(color);
    if (!rgb) return;

    const code = `/* CSS Glassmorphism Generator by DevTools Pro */
background: rgba(${rgb}, ${transparency});
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(${rgb}, ${outline});`;
    
    setCssCode(code);
  }, [blur, transparency, outline, color]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Glassmorphism CSS Generator</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Create the perfect frosted glass effect for your UI designs and instantly copy the CSS code.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Editor Side */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Blur Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 500 }}>Blur Value</label>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{blur}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              step="1"
              value={blur} 
              onChange={(e) => setBlur(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Transparency Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 500 }}>Transparency</label>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{(transparency * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={transparency} 
              onChange={(e) => setTransparency(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Outline Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 500 }}>Outline / Border</label>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{(outline * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={outline} 
              onChange={(e) => setOutline(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Color Picker */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 500 }}>Base Color</label>
              <span style={{ color: 'var(--text-secondary)' }}>{color}</span>
            </div>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              style={{ 
                width: '100%', 
                height: '40px', 
                cursor: 'pointer',
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '2px'
              }}
            />
          </div>

        </div>

        {/* Live Preview Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Background area for preview */}
          <div style={{ 
            position: 'relative',
            height: '400px', 
            borderRadius: '16px',
            background: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {/* The Glassmorphism Card */}
            <div style={{
              width: '80%',
              padding: '2rem',
              background: `rgba(${hexToRgb(color)}, ${transparency})`,
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(${hexToRgb(color)}, ${outline})`,
              textAlign: 'center',
              color: '#fff'
            }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Live Preview</h2>
              <p style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)', lineHeight: '1.6' }}>
                Adjust the sliders on the left to see the frosted glass effect change in real-time. This is the exact design system used by Apple and modern web apps.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>CSS Code</h3>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} 
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy CSS"}
              </button>
            </div>
            <pre style={{ 
              background: 'rgba(0,0,0,0.4)', 
              padding: '1rem', 
              borderRadius: '8px', 
              overflowX: 'auto',
              color: '#38bdf8',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {cssCode}
            </pre>
          </div>
          
          <SmartBanner type="design" />
          
        </div>
      </div>
      
      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>What is Glassmorphism?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Glassmorphism is a UI design trend that emphasizes light or dark objects placed on top of colorful backgrounds. It uses background blur to create a "frosted glass" effect, allowing the background to shine through. This adds depth and visual hierarchy to your interfaces, making them look highly premium and modern.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Our generator automatically calculates the correct <code>backdrop-filter</code> CSS properties and adds vendor prefixes to ensure your glass effect works perfectly across all modern browsers, including Chrome, Safari, and Firefox.
        </p>
      </article>
    </div>
  );
}
