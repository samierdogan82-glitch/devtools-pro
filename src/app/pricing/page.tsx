import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Pro Membership - DevTools Pro",
  description: "Upgrade to DevTools Pro for unlimited access, ad-free experience, API access, and cloud sync.",
};

export default function PricingPage() {
  return (
    <div className="container" style={{ margin: '3rem auto 6rem auto', maxWidth: '1100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 16px', 
          borderRadius: '999px', 
          background: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#10b981',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          fontFamily: 'monospace'
        }}>
          ⚡ LIFETIME DEAL AVAILABLE
        </div>
        <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', marginBottom: '1rem' }}>
          Simple, Transparent <span className="text-gradient">Pricing</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Free forever for essential tools. Upgrade to Pro for high-speed cloud sync, ad-free workflow, and enterprise utilities.
        </p>
      </div>

      {/* Pricing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
        
        {/* Free Plan */}
        <div className="glass-panel" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '2.5rem',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Community Free</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Perfect for casual developers and quick everyday utilities.
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800 }}>$0</span>
            <span style={{ color: 'var(--text-secondary)' }}>/ forever</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981' }}>✓</span> Access to all 20+ web utilities
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981' }}>✓</span> 100% Client-side data privacy
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981' }}>✓</span> Ctrl + K Command Palette
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.5 }}>
              <span>✕</span> Ad-free experience
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.5 }}>
              <span>✕</span> Unlimited Batch JSON Export
            </li>
          </ul>

          <Link href="/" className="btn btn-outline" style={{ textAlign: 'center', marginTop: 'auto', textDecoration: 'none' }}>
            Start Using Free
          </Link>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div className="glass-panel" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '2.5rem',
          borderRadius: '24px',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, rgba(10, 15, 28, 0.6) 100%)',
          position: 'relative',
          boxShadow: '0 0 50px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '24px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: '999px',
            letterSpacing: '1px'
          }}>
            MOST POPULAR
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Pro Lifetime</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            For serious developers, power users, and agency engineers.
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: '#fff' }}>$29</span>
            <span style={{ color: 'var(--text-secondary)' }}>/ one-time payment</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: '#e2e8f0' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> <strong>100% Ad-Free Experience</strong>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Unlimited Batch Processing & Exports
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Custom API Webhooks & Secret Vault
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Early Access to All New 2026 Utilities
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> Lifetime Updates Included
            </li>
          </ul>

          <a 
            href="https://buy.stripe.com/test_placeholder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary" 
            style={{ 
              textAlign: 'center', 
              marginTop: 'auto', 
              textDecoration: 'none',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3b82f6, #10b981)',
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)'
            }}
          >
            ⚡ Unlock Pro Lifetime ($29)
          </a>
        </div>

      </div>

      {/* Trust & Guarantee */}
      <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>🔒 256-Bit SSL Encrypted Checkout • Instant Access • 14-Day Money-Back Guarantee</p>
      </div>

    </div>
  );
}
