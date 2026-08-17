"use client";

import { useState } from "react";
import SmartBanner from "@/components/SmartBanner";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (space: number) => {
    try {
      setError(null);
      if (!input.trim()) {
        setOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, space));
    } catch (err: any) {
      setError(err.message || "Invalid JSON");
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>JSON Formatter & Validator</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => formatJson(2)}>Format (2 Spaces)</button>
        <button className="btn btn-outline" onClick={() => formatJson(4)}>Format (4 Spaces)</button>
        <button className="btn btn-outline" onClick={() => formatJson(0)}>Minify</button>
        <button className="btn" style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)' }} onClick={clearAll}>Clear</button>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--error)', color: '#fca5a5', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: '600px', marginBottom: '3rem' }}>
        
        {/* Input Panel */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Input JSON</span>
          </div>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your raw JSON here...&#10;e.g. {"name":"John", "age":30}'
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'transparent',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              resize: 'none',
              padding: '1rem',
              color: '#fff',
              outline: 'none',
              boxShadow: 'none'
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Output</span>
            <button 
              className="btn btn-outline" 
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
              onClick={copyToClipboard}
              disabled={!output}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            className="input-field"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'rgba(0,0,0,0.2)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              resize: 'none',
              padding: '1rem',
              color: '#38bdf8', // Light blue syntax feel
              outline: 'none',
              boxShadow: 'none'
            }}
          />
        </div>
      </div>

      {/* Developer Contextual Banner */}
      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="developer" />
      </div>

      <article style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why use a local JSON Formatter?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          As developers, we constantly work with JSON data from APIs, configuration files, and databases. Often, this data comes back unformatted, minified, and impossible to read. Our <strong>JSON Formatter & Validator</strong> instantly beautifies your code, making it readable and easy to debug.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <strong>Maximum Security:</strong> Unlike many online tools that send your proprietary JSON strings to a remote server for processing (putting your company's data at risk), our tool processes everything 100% locally in your browser. Your data never leaves your computer.
        </p>
      </article>
    </div>
  );
}
