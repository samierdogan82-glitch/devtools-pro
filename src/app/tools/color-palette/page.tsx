"use client";

import { useState, useEffect, useCallback } from "react";
import SmartBanner from "@/components/SmartBanner";

interface ColorItem {
  hex: string;
  locked: boolean;
}

export default function ColorPalettePage() {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Helper to convert HSL to HEX
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  // Generate harmonious colors using a base Hue
  const generatePalette = useCallback((existingColors: ColorItem[]) => {
    const baseHue = Math.floor(Math.random() * 360);
    const newColors: ColorItem[] = [];
    
    // Scheme selection (analogous, monochromatic, triadic, etc.)
    const scheme = Math.floor(Math.random() * 4);
    
    for (let i = 0; i < 5; i++) {
      if (existingColors[i] && existingColors[i].locked) {
        newColors.push(existingColors[i]);
        continue;
      }

      let h = baseHue;
      let s = 60 + Math.random() * 40; // 60-100%
      let l = 20 + Math.random() * 60; // 20-80%

      switch (scheme) {
        case 0: // Analogous (adjacent hues)
          h = (baseHue + (i * 30)) % 360;
          break;
        case 1: // Monochromatic (same hue, varying lightness/saturation)
          s = 40 + Math.random() * 60;
          l = 10 + (i * 15);
          break;
        case 2: // Triadic
          h = (baseHue + (i * 120)) % 360;
          break;
        case 3: // Random aesthetic
          h = Math.floor(Math.random() * 360);
          break;
      }

      newColors.push({
        hex: hslToHex(h, s, l),
        locked: false
      });
    }
    return newColors;
  }, []);

  // Initial load
  useEffect(() => {
    setColors(generatePalette([]));
  }, [generatePalette]);

  // Spacebar listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Prevent page scrolling
        setColors(prev => generatePalette(prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (index: number) => {
    setColors(prev => {
      const newColors = [...prev];
      newColors[index] = { ...newColors[index], locked: !newColors[index].locked };
      return newColors;
    });
  };

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1000);
  };

  const isLightColor = (hex: string) => {
    const hexColor = hex.replace('#', '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Color Palette Generator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Press the <strong>Spacebar</strong> to generate beautiful, harmonious color palettes!
        </p>
      </div>
      
      <div 
        className="glass-panel" 
        style={{ 
          display: 'flex', 
          height: '500px', 
          width: '100%', 
          borderRadius: '16px', 
          overflow: 'hidden',
          marginBottom: '3rem',
          padding: 0
        }}
      >
        {colors.map((colorItem, index) => {
          const textColor = isLightColor(colorItem.hex) ? '#000000' : '#ffffff';
          
          return (
            <div 
              key={index}
              style={{
                flex: 1,
                backgroundColor: colorItem.hex,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: '2rem',
                transition: 'background-color 0.3s ease',
                position: 'relative'
              }}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'all 0.2s',
                  position: 'absolute',
                  top: '40%',
                  color: textColor
                }}
                className="color-controls"
              >
                <button 
                  onClick={() => toggleLock(index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: textColor,
                    fontSize: '2rem',
                    cursor: 'pointer',
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
                  }}
                  title={colorItem.locked ? "Unlock color" : "Lock color"}
                >
                  {colorItem.locked ? '🔒' : '🔓'}
                </button>
              </div>

              <button
                onClick={() => copyToClipboard(colorItem.hex, index)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textColor,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  zIndex: 10
                }}
                className="hex-button"
              >
                {copiedIndex === index ? 'COPIED!' : colorItem.hex}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setColors(prev => generatePalette(prev))}
          style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '30px' }}
        >
          Generate (Spacebar)
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="design" />
      </div>
      
      <article style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Science of Aesthetic Colors</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Finding the perfect color palette for your brand, website, or digital art can be frustrating. That's why we built this lightning-fast generator based on color theory math.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Every time you press the <strong>Spacebar</strong>, our algorithm (running entirely in your browser) selects a base Hue and then applies a randomly selected color harmony rule—such as <em>Analogous</em>, <em>Monochromatic</em>, or <em>Triadic</em>—to generate 5 colors that are mathematically guaranteed to look beautiful together.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          If you see a color you love, click the "Lock" icon to keep it. Then hit Spacebar again to generate new matching colors around your locked choices!
        </p>
      </article>

      {/* Hover effects for the color columns */}
      <style dangerouslySetInnerHTML={{__html: `
        .color-controls {
          opacity: 0;
        }
        div[style*="flex: 1"]:hover .color-controls {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .hex-button:hover {
          background: rgba(255,255,255,0.2) !important;
        }
      `}} />
    </div>
  );
}
