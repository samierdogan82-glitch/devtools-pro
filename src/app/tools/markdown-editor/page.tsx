"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import SmartBanner from "@/components/SmartBanner";

const DEFAULT_MARKDOWN = `# Welcome to the Live Markdown Editor!

This is a premium, distraction-free environment for writers and developers.

## Features:
1. **Real-time Preview:** Type on the left, see results on the right.
2. **Glassmorphism UI:** Easy on the eyes.
3. **100% Private:** Your text is never sent to any server.

### Code Example:
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello \${name}! Welcome to DevTools Pro.\`);
}
\`\`\`

> "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs

You can easily add [Links](https://devtools-pro.com) or emphasize words with *italics* or **bold** text.
`;

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearEditor = () => {
    setMarkdown("");
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Live Markdown Editor & Previewer</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        A distraction-free, lightning-fast Markdown editor. Write your documentation or blog posts and see the HTML rendering instantly.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: '600px', marginBottom: '3rem' }}>
        
        {/* Editor Side */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Markdown Editor</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-outline" 
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                onClick={clearEditor}
              >
                Clear
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy MD"}
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'transparent',
              fontFamily: 'monospace',
              fontSize: '1rem',
              resize: 'none',
              padding: '1.5rem',
              color: '#fff',
              outline: 'none',
              boxShadow: 'none',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* Live Preview Side */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Live HTML Preview</span>
          </div>
          <div 
            style={{ 
              flex: 1, 
              padding: '1.5rem',
              overflowY: 'auto',
              background: 'rgba(0,0,0,0.2)',
              color: '#e2e8f0',
              lineHeight: '1.6'
            }}
            className="markdown-preview-container"
          >
            {markdown ? (
              <ReactMarkdown>{markdown}</ReactMarkdown>
            ) : (
              <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
                Preview will appear here...
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="developer" />
      </div>
      
      <article style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why Write in Markdown?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          It is the standard for GitHub Readme files, Reddit formatting, static site generators, and developer documentation. By using our Live Editor, you can stay in the flow state, writing without the distraction of complex toolbars or clunky word processors, while ensuring your final output looks perfect.
        </p>
      </article>

      {/* Basic styles for the markdown preview specifically */}
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-preview-container h1, 
        .markdown-preview-container h2, 
        .markdown-preview-container h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        .markdown-preview-container p {
          margin-bottom: 1rem;
        }
        .markdown-preview-container a {
          color: var(--accent-primary);
          text-decoration: underline;
        }
        .markdown-preview-container ul, 
        .markdown-preview-container ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        .markdown-preview-container blockquote {
          border-left: 4px solid var(--accent-secondary);
          padding-left: 1rem;
          margin-left: 0;
          color: var(--text-secondary);
          font-style: italic;
        }
        .markdown-preview-container pre {
          background: rgba(0,0,0,0.5);
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .markdown-preview-container code {
          font-family: monospace;
          background: rgba(0,0,0,0.5);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
        }
        .markdown-preview-container pre code {
          background: transparent;
          padding: 0;
        }
      `}} />
    </div>
  );
}
