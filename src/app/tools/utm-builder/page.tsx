"use client";

import { useState, useEffect } from "react";
import SmartBanner from "@/components/SmartBanner";

export default function UtmBuilderPage() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url) {
      setGeneratedUrl("");
      return;
    }

    try {
      // Basic URL validation
      const baseUrl = url.startsWith('http') ? url : `https://${url}`;
      const urlObj = new URL(baseUrl);
      
      const params = new URLSearchParams(urlObj.search);
      
      if (source) params.set('utm_source', source);
      else params.delete('utm_source');
      
      if (medium) params.set('utm_medium', medium);
      else params.delete('utm_medium');
      
      if (campaign) params.set('utm_campaign', campaign);
      else params.delete('utm_campaign');
      
      if (term) params.set('utm_term', term);
      else params.delete('utm_term');
      
      if (content) params.set('utm_content', content);
      else params.delete('utm_content');

      const queryString = params.toString();
      const finalUrl = `${urlObj.origin}${urlObj.pathname}${queryString ? `?${queryString}` : ''}${urlObj.hash}`;
      
      setGeneratedUrl(finalUrl);
    } catch (e) {
      setGeneratedUrl("Please enter a valid website URL");
    }
  }, [url, source, medium, campaign, term, content]);

  const copyToClipboard = () => {
    if (!generatedUrl || generatedUrl.includes("valid website URL")) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearForm = () => {
    setUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Campaign UTM Link Builder</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Easily generate tracking URLs for your marketing campaigns to track performance in Google Analytics.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Editor Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Website URL <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input 
                className="input-field"
                type="text" 
                placeholder="https://www.your-website.com" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>The full website URL (e.g. https://www.example.com)</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Campaign Source <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input 
                  className="input-field"
                  type="text" 
                  placeholder="google, newsletter, facebook" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Campaign Medium
                </label>
                <input 
                  className="input-field"
                  type="text" 
                  placeholder="cpc, banner, email" 
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Campaign Name
              </label>
              <input 
                className="input-field"
                type="text" 
                placeholder="spring_sale, promo_code" 
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Campaign Term
                </label>
                <input 
                  className="input-field"
                  type="text" 
                  placeholder="running+shoes (Identify keywords)" 
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Campaign Content
                </label>
                <input 
                  className="input-field"
                  type="text" 
                  placeholder="logolink or textlink" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%' }} onClick={clearForm}>
              Clear All Fields
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--accent-primary)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Generated Campaign URL</h3>
            <div 
              style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '1rem', 
                borderRadius: '8px', 
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                minHeight: '80px',
                marginBottom: '1rem',
                border: '1px solid var(--glass-border)',
                color: generatedUrl.includes("valid") ? 'var(--error)' : '#fff'
              }}
            >
              {generatedUrl || "Enter a URL and parameters above..."}
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }} 
              onClick={copyToClipboard}
              disabled={!generatedUrl || generatedUrl.includes("valid")}
            >
              {copied ? "Copied to Clipboard!" : "Copy URL"}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SmartBanner type="marketing" />
        </div>
      </div>
      
      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>What are UTM Parameters?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          UTM (Urchin Tracking Module) parameters are five variants of URL parameters used by marketers to track the effectiveness of online marketing campaigns across traffic sources and publishing media. They were introduced by Google Analytics' predecessor Urchin and are supported out-of-the-box by Google Analytics.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          By adding campaign parameters to the destination URLs you use in your ad campaigns, you can see which campaigns perform best, track conversions precisely, and measure your exact Return on Investment (ROI) for every marketing dollar spent.
        </p>
      </article>
    </div>
  );
}
