"use client";

import { useState, useRef, ChangeEvent } from "react";
import SmartBanner from "@/components/SmartBanner";

export default function ImageOptimizerPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      // Reset previous compression
      setDownloadUrl(null);
      setCompressedSize(null);
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imgRef.current || !canvasRef.current || !imageSrc) return;

    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw image to canvas
    ctx.drawImage(img, 0, 0);

    // Compress to WebP
    const dataUrl = canvas.toDataURL("image/webp", quality);
    setDownloadUrl(dataUrl);

    // Calculate roughly the new size (base64 is ~33% larger than binary, so we estimate binary size)
    const base64Length = dataUrl.length - "data:image/webp;base64,".length;
    const sizeInBytes = Math.ceil(base64Length * 0.75);
    setCompressedSize(sizeInBytes);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateSavings = () => {
    if (!originalSize || !compressedSize) return 0;
    const savings = ((originalSize - compressedSize) / originalSize) * 100;
    return savings > 0 ? savings.toFixed(1) : 0;
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>WebP Image Optimizer</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Editor Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--glass-border)' }}>
            <label 
              htmlFor="image-upload" 
              style={{ 
                display: 'block', 
                cursor: 'pointer', 
                padding: '2rem 0',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
              <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Upload an Image (JPG/PNG)</h3>
              <p>Click to browse files (Max: No limit, processed locally)</p>
            </label>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }}
            />
          </div>

          {imageSrc && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>Optimization Settings</h3>
                <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{(quality * 100).toFixed(0)}% Quality</span>
              </div>
              
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05"
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', marginBottom: '2rem' }}
              />

              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={processImage}>
                Convert & Compress to WebP
              </button>

              {/* Hidden elements for processing */}
              <img ref={imgRef} src={imageSrc} alt="Original" style={{ display: 'none' }} crossOrigin="anonymous" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          )}

          {downloadUrl && (
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--success)' }}>
              <h3 style={{ color: 'var(--success)', marginBottom: '1.5rem', textAlign: 'center' }}>Optimization Complete!</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem', textAlign: 'center' }}>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Original Size</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatBytes(originalSize || 0)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>New Size (WebP)</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--success)' }}>{formatBytes(compressedSize || 0)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Saved</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{calculateSavings()}%</div>
                </div>
              </div>

              <a 
                href={downloadUrl} 
                download={`optimized-${Date.now()}.webp`}
                className="btn btn-primary" 
                style={{ display: 'block', textAlign: 'center', background: 'var(--success)', color: '#fff', border: 'none' }}
              >
                Download WebP Image
              </a>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SmartBanner type="design" />
        </div>
      </div>
      
      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why Convert to WebP?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster. WebP lossless images are 26% smaller in size compared to PNGs, and WebP lossy images are 25-34% smaller than comparable JPEG images.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <strong>Zero Server Cost & 100% Privacy:</strong> Our Image Optimizer uses your browser's native HTML5 Canvas API to process images directly on your device. Your sensitive photos and graphics are never uploaded to any cloud server, ensuring absolute privacy while saving bandwidth.
        </p>
      </article>
    </div>
  );
}
