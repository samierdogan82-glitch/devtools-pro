"use client";

import { useState, useMemo } from "react";
import SmartBanner from '@/components/SmartBanner';

export default function TextAnalyzer() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === "") {
      return { characterCount: 0, wordCount: 0, sentenceCount: 0, paragraphCount: 0, readingTimeMinutes: 0, hasText: false };
    }
    const characterCount = text.length;
    const wordCount = trimmedText.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphCount = text.split(/\n+/).filter(Boolean).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 225));
    
    let seoScore = 0;
    if (wordCount > 0) {
      seoScore += Math.min(40, (wordCount / 300) * 40);
      seoScore += Math.min(30, (paragraphCount / 4) * 30);
      const avgWordsPerSentence = wordCount / Math.max(1, sentenceCount);
      if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20) {
        seoScore += 30;
      } else {
        seoScore += 15;
      }
    }
    seoScore = Math.round(seoScore);
    
    let scoreColor = 'var(--error)';
    let scoreLabel = 'Needs Work';
    if (seoScore >= 80) {
      scoreColor = 'var(--success)';
      scoreLabel = 'Excellent';
    } else if (seoScore >= 50) {
      scoreColor = '#f59e0b';
      scoreLabel = 'Good';
    }

    return { characterCount, wordCount, sentenceCount, paragraphCount, readingTimeMinutes, seoScore, scoreColor, scoreLabel, hasText: true };
  }, [text]);

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Text Analyzer & Word Counter</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <label htmlFor="text-input" style={{ display: 'none' }}>Enter text to analyze</label>
          <textarea
            id="text-input"
            aria-label="Text to analyze"
            className="input-field"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ 
              minHeight: '400px', 
              resize: 'vertical', 
              fontSize: '1.1rem',
              lineHeight: '1.6',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              boxShadow: 'none',
              padding: '0'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              <h2 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>SEO Readiness</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  color: stats.hasText ? stats.scoreColor : 'var(--text-secondary)',
                  textShadow: stats.hasText ? `0 0 20px ${stats.scoreColor}40` : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {stats.hasText ? stats.seoScore : '0'}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/100</span>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: stats.hasText ? stats.scoreColor : 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 600 }}>
                {stats.hasText ? stats.scoreLabel : 'Awaiting Text'}
              </div>
            </div>

            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Statistics</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Words</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{stats.wordCount}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Characters</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{stats.characterCount}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Sentences</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{stats.sentenceCount}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Paragraphs</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{stats.paragraphCount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Est. Reading Time</span>
              <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>{stats.hasText ? `~${stats.readingTimeMinutes} min` : '-'}</span>
            </div>
          </div>
          {/* Contextual Affiliate Banner */}
          <SmartBanner type="grammar" />
        </div>
      </div>

      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why Use a Word Counter?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Whether you are writing an essay, a blog post, a novel, or a social media update, knowing your word count is essential. Many platforms have strict character limits, and SEO guidelines often recommend specific word counts for optimal ranking.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Our real-time text analyzer not only counts words and characters instantly but also provides insights like estimated reading time. All processing happens in your browser, meaning your text is never uploaded to any server. It is completely private and secure.
        </p>
      </article>
    </div>
  );
}
