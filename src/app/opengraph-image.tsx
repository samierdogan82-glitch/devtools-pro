import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'DevTools Pro - Premium Web Utilities';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '20px', 
            background: 'linear-gradient(135deg, #3b82f6, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
          }}>
            ⚡
          </div>
          <h1 style={{ fontSize: '72px', fontWeight: 800, margin: 0, letterSpacing: '-2px' }}>
            <span style={{ color: '#3b82f6' }}>DevTools</span> Pro
          </h1>
        </div>
        
        <p style={{ fontSize: '42px', fontWeight: 500, color: '#94a3b8', textAlign: 'center', maxWidth: '900px', lineHeight: 1.4 }}>
          Premium, Fast, and Secure Web Utilities for Developers, Creators, and Parents.
        </p>

        <div style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '40px', fontSize: '28px', border: '1px solid rgba(255,255,255,0.2)' }}>🔒 Password Gen</div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '40px', fontSize: '28px', border: '1px solid rgba(255,255,255,0.2)' }}>🛡️ SafeScreen</div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '40px', fontSize: '28px', border: '1px solid rgba(255,255,255,0.2)' }}>🔍 SEO Meta</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
