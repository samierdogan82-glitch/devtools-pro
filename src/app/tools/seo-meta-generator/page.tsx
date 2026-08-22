"use client";

import { useState } from "react";
import SmartBanner from '@/components/SmartBanner';
import { copyToClipboard as secureCopy } from "@/lib/clipboard";

export default function SeoMetaGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const titleLength = title.length;
  const descriptionLength = description.length;

  const escapeQuotes = (str: string) => str.replace(/"/g, '&quot;');
  
  const generatedCode = `
<!-- Primary Meta Tags -->
<title>${escapeQuotes(title) || "Page Title"}</title>
<meta name="title" content="${escapeQuotes(title)}" />
<meta name="description" content="${escapeQuotes(description)}" />
${keywords ? `<meta name="keywords" content="${escapeQuotes(keywords)}" />\n` : ""}${author ? `<meta name="author" content="${escapeQuotes(author)}" />\n` : ""}
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${escapeQuotes(url)}" />
<meta property="og:title" content="${escapeQuotes(title)}" />
<meta property="og:description" content="${escapeQuotes(description)}" />
<meta property="og:image" content="${escapeQuotes(image)}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${escapeQuotes(url)}" />
<meta property="twitter:title" content="${escapeQuotes(title)}" />
<meta property="twitter:description" content="${escapeQuotes(description)}" />
<meta property="twitter:image" content="${escapeQuotes(image)}" />
  `.trim();

  const copyCode = async () => {
    const success = await secureCopy(generatedCode);
    if (success) {
      alert("Code copied to clipboard!");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>SEO Meta Tag Generator</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Editor Side */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="meta-title" className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Site Title</span>
              <span style={{ color: titleLength > 60 ? 'var(--error)' : 'var(--success)' }}>
                {titleLength} / 60
              </span>
            </label>
            <input 
              id="meta-title"
              type="text" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Best Running Shoes 2024"
            />
          </div>

          <div>
            <label htmlFor="meta-description" className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Site Description</span>
              <span style={{ color: descriptionLength > 160 ? 'var(--error)' : 'var(--success)' }}>
                {descriptionLength} / 160
              </span>
            </label>
            <textarea 
              id="meta-description"
              className="input-field" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="e.g. Discover the most comfortable and durable running shoes for your next marathon."
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </div>

          <div>
            <label htmlFor="meta-keywords" className="input-label">Keywords (comma separated)</label>
            <input 
              id="meta-keywords"
              type="text" 
              className="input-field" 
              value={keywords} 
              onChange={(e) => setKeywords(e.target.value)} 
              placeholder="e.g. shoes, running, marathon, sports"
            />
          </div>

          <div>
            <label htmlFor="meta-author" className="input-label">Author</label>
            <input 
              id="meta-author"
              type="text" 
              className="input-field" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label htmlFor="meta-image" className="input-label">Image URL (For Social Sharing)</label>
            <input 
              id="meta-image"
              type="text" 
              className="input-field" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="https://yoursite.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="meta-url" className="input-label">Site URL</label>
            <input 
              id="meta-url"
              type="text" 
              className="input-field" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://yoursite.com"
            />
          </div>
        </div>

        {/* Preview Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Google Preview */}
          <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', color: '#1a0dab' }}>
            <h3 style={{ marginBottom: '1rem', color: '#333', fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Google Search Preview</h3>
            <div style={{ fontSize: '14px', color: '#202124', marginBottom: '4px' }}>
              {url || "https://yoursite.com"}
            </div>
            <div style={{ fontSize: '20px', color: '#1a0dab', textDecoration: 'none', marginBottom: '4px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {title || "Your Page Title Looks Like This On Google"}
            </div>
            <div style={{ fontSize: '14px', color: '#4d5156', lineHeight: '1.58' }}>
              {description || "This is how your description will appear in Google search results. Keep it between 50 and 160 characters for the best appearance and click-through rate."}
            </div>
          </div>

          {/* Generated HTML */}
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Generated Code</h3>
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={copyCode}>
                Copy Code
              </button>
            </div>
            <textarea 
              readOnly 
              value={generatedCode}
              style={{ 
                width: '100%', 
                flex: 1, 
                minHeight: '200px', 
                background: 'rgba(0,0,0,0.3)', 
                color: '#a5b4fc', 
                border: '1px solid var(--glass-border)', 
                borderRadius: '8px', 
                padding: '1rem', 
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Banner */}
      <div style={{ marginTop: '2rem' }}>
        <SmartBanner type="seo" />
      </div>

      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>What are Meta Tags?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Meta tags are snippets of text that describe a page's content. They don't appear on the page itself, but only in the page's source code. Meta tags are essentially little content descriptors that help tell search engines what a web page is about.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Using our SEO Meta Tag Generator, you can easily create the necessary HTML code to ensure your web pages are optimized for search engines like Google, as well as social media platforms like Facebook and Twitter (Open Graph tags).
        </p>
      </article>
    </div>
  );
}
