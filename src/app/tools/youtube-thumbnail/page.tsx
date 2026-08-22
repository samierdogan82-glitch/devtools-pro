"use client";

import { useState } from "react";
import Image from "next/image";
import SmartBanner from "@/components/SmartBanner";

export default function YouTubeThumbnailPage() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const extractVideoId = (inputUrl: string) => {
    try {
      // Handle youtu.be shortlinks
      if (inputUrl.includes("youtu.be/")) {
        const id = inputUrl.split("youtu.be/")[1].split("?")[0];
        return id;
      }
      
      // Handle standard youtube.com links
      const urlObj = new URL(inputUrl);
      const validHosts = ["youtube.com", "www.youtube.com", "m.youtube.com"];
      if (validHosts.includes(urlObj.hostname)) {
        if (urlObj.pathname === "/watch") {
          return urlObj.searchParams.get("v");
        }
        if (urlObj.pathname.startsWith("/shorts/")) {
          return urlObj.pathname.split("/")[2];
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const handleExtract = () => {
    setError("");
    setVideoId(null);

    if (!url.trim()) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    const id = extractVideoId(url);
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      setVideoId(id);
    } else {
      setError("Could not extract Video ID. Make sure the URL is correct.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExtract();
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>YouTube Thumbnail Downloader</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Extract and download high-quality thumbnails from any YouTube video instantly. 100% free and secure.
      </p>
      
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>YouTube Video URL</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="url" 
              className="input-field" 
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-primary"
              onClick={handleExtract}
              style={{ padding: '0.8rem 2rem' }}
            >
              Extract
            </button>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
        </div>
      </div>

      {videoId && (
        <div style={{ display: 'grid', gap: '2rem', marginBottom: '4rem' }}>
          
          {/* Max Res (HD) */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: 'var(--accent-primary)' }}>HD Quality (Max Res)</h3>
              <a 
                href={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                Open Full Size
              </a>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
              {/* Note: maxresdefault might not exist for older videos, in a real pro app we might do fallback checks, 
                  but img.youtube.com handles this mostly gracefully for standard modern videos. */}
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="HD Thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Standard Res */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Standard Quality</h3>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
                  alt="Standard Thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>High Quality</h3>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="High Thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>

        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="marketing" />
      </div>
      
      <article style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>How does the YouTube Thumbnail Extractor work?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Every time a creator uploads a video to YouTube, the platform automatically generates multiple thumbnail images in different resolutions and stores them on their highly optimized image servers (<code>img.youtube.com</code>).
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Our tool parses your provided URL, securely extracts the unique 11-character Video ID, and constructs the direct links to Google's servers. Since we fetch the images directly from Google, this tool is lightning fast, requires zero server processing on our end, and is completely free to use.
        </p>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Use Cases</h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Marketers & SEO:</strong> Analyze competitors' high-performing video thumbnails to see what design elements generate the highest click-through rate (CTR).</li>
          <li><strong>Content Creators:</strong> Recover lost thumbnail files of your older YouTube videos.</li>
          <li><strong>Designers:</strong> Extract high-resolution background assets from video covers for your portfolio or client mood boards.</li>
        </ul>
      </article>
    </div>
  );
}
