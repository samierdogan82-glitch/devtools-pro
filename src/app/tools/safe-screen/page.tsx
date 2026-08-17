"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function SafeScreenPage() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const generateSafeLink = () => {
    setError('');
    setVideoId(null);
    
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    // Regex to match youtube.com and youtu.be URLs, including shorts
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);

    if (match && match[1]) {
      setVideoId(match[1]);
    } else {
      setError('Invalid YouTube link. Please ensure it is a valid YouTube video or Shorts URL.');
    }
  };

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="gradient-text">SafeScreen Viewer</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
          Distraction-free, safe video viewing for kids. Paste a YouTube link below to remove ads, comments, and recommendations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="video-url" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              YouTube Video Link
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input
                id="video-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{
                  flex: '1 1 300px',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                onKeyDown={(e) => e.key === 'Enter' && generateSafeLink()}
              />
              <button 
                onClick={generateSafeLink}
                className="btn-primary"
                style={{ padding: '0 2rem', flex: '0 0 auto' }}
              >
                Generate Safe Link
              </button>
            </div>
            {error && <p style={{ color: '#ff6b6b', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
          </div>

          {videoId ? (
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#000' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
                title="SafeScreen Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div style={{ 
              width: '100%', 
              paddingBottom: '56.25%', 
              borderRadius: '12px', 
              border: '2px dashed var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.2)'
            }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', textAlign: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 1rem', opacity: 0.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <p>Enter a link above to generate a safe view.</p>
              </div>
            </div>
          )}
        </div>

        {/* Affiliate & AdSense Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Protect Your Kids Online</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Get total peace of mind with the world's leading parental control software.
            </p>
            <Link href="/recommended" className="btn-secondary" style={{ display: 'block', width: '100%' }}>
              Learn More
            </Link>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              [AdSense Placeholder]
              <br />
              Responsive Display Ad
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
