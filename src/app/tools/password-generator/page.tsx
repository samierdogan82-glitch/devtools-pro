"use client";

import { useState, useEffect } from "react";
import SmartBanner from '@/components/SmartBanner';
import { copyToClipboard as secureCopy } from "@/lib/clipboard";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("Please select at least one option.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  };

  // Generate a password automatically on first render or when settings change
  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = async () => {
    if (!password || password === "Please select at least one option.") return;
    const success = await secureCopy(password);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Advanced Password Generator</h1>
      
      <div className="glass-panel">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <label htmlFor="generated-password" style={{ display: 'none' }}>Generated Password</label>
          <input 
            id="generated-password"
            type="text" 
            className="input-field" 
            value={password} 
            readOnly 
            aria-label="Generated Password"
            style={{ fontSize: '1.25rem', fontFamily: 'monospace', flex: 1, letterSpacing: '2px', textAlign: 'center' }}
          />
          <button className="btn btn-primary" onClick={copyToClipboard} style={{ minWidth: '120px' }} aria-label="Copy password to clipboard">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="password-length" className="input-label">Password Length: {length}</label>
          </div>
          <input 
            id="password-length"
            type="range" 
            min="8" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', margin: '1rem 0' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <label htmlFor="inc-uppercase" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input id="inc-uppercase" type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
            Uppercase (A-Z)
          </label>
          <label htmlFor="inc-lowercase" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input id="inc-lowercase" type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
            Lowercase (a-z)
          </label>
          <label htmlFor="inc-numbers" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input id="inc-numbers" type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            Numbers (0-9)
          </label>
          <label htmlFor="inc-symbols" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input id="inc-symbols" type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            Symbols (!@#$)
          </label>
        </div>

        <button className="btn btn-primary" onClick={generatePassword} style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>
          Generate New Password
        </button>
      </div>

      {/* Contextual Affiliate Banner */}
      <div style={{ marginTop: '2rem' }}>
        <SmartBanner type="password" />
      </div>
      
      {/* SEO Text Area & Ad Placeholder */}
      <article style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why Use a Random Password Generator?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          In today&apos;s digital landscape, using a strong, unique password for every online account is critical. Hackers use automated tools to guess weak passwords in seconds. Our free Advanced Password Generator creates cryptographically secure passwords locally in your browser. 
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Your generated passwords are never sent over the internet or stored on our servers. By mixing uppercase letters, lowercase letters, numbers, and symbols, you significantly increase the entropy and security of your digital life.
        </p>
      </article>

      <div style={{ marginTop: '3rem', padding: '2rem', border: '1px dashed var(--glass-border)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        [AdSense Display Ad Placeholder]
      </div>
    </div>
  );
}
