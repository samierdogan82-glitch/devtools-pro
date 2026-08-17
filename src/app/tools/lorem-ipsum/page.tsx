"use client";

import { useState, useEffect } from "react";
import SmartBanner from "@/components/SmartBanner";

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", 
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", 
  "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", 
  "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", 
  "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumPage() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<"paragraphs" | "words">("paragraphs");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLorem = (num: number, format: "paragraphs" | "words") => {
    if (format === "words") {
      let result = [];
      for (let i = 0; i < num; i++) {
        result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      if (result.length > 0) {
        result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);
      }
      return result.join(" ") + ".";
    }

    // Paragraphs
    let paragraphs = [];
    for (let p = 0; p < num; p++) {
      // 5 to 10 sentences per paragraph
      const sentencesCount = Math.floor(Math.random() * 5) + 5;
      let paragraph = [];
      
      for (let s = 0; s < sentencesCount; s++) {
        // 5 to 15 words per sentence
        const wordsCount = Math.floor(Math.random() * 10) + 5;
        let sentence = [];
        
        for (let w = 0; w < wordsCount; w++) {
          sentence.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        
        const sentenceStr = sentence.join(" ");
        paragraph.push(sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1) + ".");
      }
      
      // If it's the very first paragraph, start with standard "Lorem ipsum dolor sit amet"
      if (p === 0) {
        paragraphs.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraph.slice(1).join(" "));
      } else {
        paragraphs.push(paragraph.join(" "));
      }
    }
    
    return paragraphs.join("\n\n");
  };

  useEffect(() => {
    setText(generateLorem(count, type));
  }, [count, type]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Lorem Ipsum Generator</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Instantly generate placeholder dummy text for your designs, websites, and mockups.
      </p>
      
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', alignItems: 'flex-end', justifyContent: 'center' }}>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Length</label>
          <input 
            type="number" 
            className="input-field" 
            value={count}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setCount(val);
            }}
            min="1"
            max="1000"
            style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem' }}
          />
        </div>

        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Format</label>
          <select 
            className="input-field"
            value={type}
            onChange={(e) => setType(e.target.value as "paragraphs" | "words")}
            style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem', cursor: 'pointer' }}
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flex: '1', minWidth: '200px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setText(generateLorem(count, type))}
            style={{ flex: 1, padding: '0.8rem' }}
          >
            Regenerate
          </button>
          <button 
            className={`btn ${copied ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleCopy}
            style={{ flex: 1, padding: '0.8rem' }}
          >
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>

      </div>

      <div 
        className="glass-panel" 
        style={{ 
          padding: '2rem', 
          marginBottom: '4rem',
          minHeight: '300px',
          maxHeight: '600px',
          overflowY: 'auto',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {text}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="design" />
      </div>
      
      <article style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>What is Lorem Ipsum?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>Why do we use it?</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </p>
      </article>
    </div>
  );
}
