import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://devtools-pro.com'),
  title: "DevTools Pro - Global Web Utilities",
  description: "A collection of premium developer and web utilities designed for maximum productivity.",
  openGraph: {
    title: "DevTools Pro - Global Web Utilities",
    description: "Premium, Fast, and Secure Web Utilities for Developers, Creators, and Parents.",
    url: 'https://devtools-pro.com',
    siteName: 'DevTools Pro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DevTools Pro - Global Web Utilities",
    description: "Premium, Fast, and Secure Web Utilities for Developers, Creators, and Parents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7959811775752406" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7959811775752406"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <header style={{ borderBottom: '1px solid var(--glass-border)', padding: '1.5rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
              <span className="text-gradient">DevTools</span> Pro
            </div>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/tools/safe-screen" style={{ color: '#ec4899', fontWeight: 500 }}>SafeScreen</Link>
              <Link href="/recommended" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Recommended Tools</Link>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          {children}
        </main>

        <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '3rem 0', marginTop: 'auto' }}>
          <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>&copy; {new Date().getFullYear()} DevTools Pro. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
