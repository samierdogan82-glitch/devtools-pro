import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <section style={{ textAlign: 'center', margin: '4rem 0 6rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
          Supercharge Your Workflow with <br />
          <span className="text-gradient">Premium Web Utilities</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
          Free, fast, and secure tools for developers, marketers, and creators. No registration required.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/tools/password-generator" className="btn btn-primary" style={{ textDecoration: 'none' }}>Explore Tools</Link>
          <Link href="/blog" className="btn btn-outline" style={{ textDecoration: 'none' }}>Read the Blog</Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🔒
          </div>
          <h3>Advanced Password Gen</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Generate cryptographically secure passwords with custom rules and constraints.
          </p>
          <a href="/tools/password-generator" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            📝
          </div>
          <h3>Text Analyzer</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Instant character count, word count, reading time, and keyword density analysis.
          </p>
          <a href="/tools/text-analyzer" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🔍
          </div>
          <h3>SEO Meta Generator</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Preview and generate perfect SEO title and description tags for Google search.
          </p>
          <a href="/tools/seo-meta-generator" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-primary)', color: '#fff', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>NEW</span>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>
            📱
          </div>
          <h3>Smart QR Generator</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Create custom, high-resolution QR codes with logos and colors instantly.
          </p>
          <a href="/tools/qr-generator" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-primary)', color: '#fff', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>NEW</span>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🖼️
          </div>
          <h3>WebP Image Optimizer</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Compress and convert images to next-gen WebP format. Zero server cost, 100% private.
          </p>
          <a href="/tools/image-optimizer" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {"{ }"}
          </div>
          <h3>JSON Formatter & Validator</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Format, minify, and validate JSON data instantly in your browser. 100% secure.
          </p>
          <a href="/tools/json-formatter" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🛡️
          </div>
          <h3>SafeScreen</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Distraction-free, safe YouTube video player for kids. No ads, no sidebars, no comments.
          </p>
          <a href="/tools/safe-screen" style={{ color: 'var(--accent-primary)', fontWeight: 500, marginTop: 'auto' }}>Try it out &rarr;</a>
        </div>
      </section>
    </div>
  );
}
