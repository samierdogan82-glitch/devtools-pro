import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: '#0a0f1c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

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
  appleWebApp: {
    capable: true,
    title: "DevTools Pro",
    statusBarStyle: "black-translucent",
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
              <Link href="/tools/dummy-data" style={{ color: '#10b981', fontWeight: 500 }}>Mock Data</Link>
              <Link href="/tools/box-shadow" style={{ color: '#0ea5e9', fontWeight: 500 }}>Box Shadow</Link>
              <Link href="/tools/lorem-ipsum" style={{ color: '#f59e0b', fontWeight: 500 }}>Lorem Ipsum</Link>
              <Link href="/tools/color-palette" style={{ color: '#10b981', fontWeight: 500 }}>Color Palette</Link>
              <Link href="/tools/fancy-font-generator" style={{ color: '#d946ef', fontWeight: 500 }}>Fancy Font</Link>
              <Link href="/tools/youtube-thumbnail" style={{ color: '#ef4444', fontWeight: 500 }}>YT Thumbnail</Link>
              <Link href="/tools/focus-timer" style={{ color: '#ef4444', fontWeight: 500 }}>Focus Timer</Link>
              <Link href="/tools/markdown-editor" style={{ color: '#6366f1', fontWeight: 500 }}>Markdown</Link>
              <Link href="/tools/glassmorphism-generator" style={{ color: '#ec4899', fontWeight: 500 }}>Glassmorphism</Link>
              <Link href="/tools/utm-builder" style={{ color: '#f97316', fontWeight: 500 }}>UTM Builder</Link>
              <Link href="/tools/image-optimizer" style={{ color: '#a855f7', fontWeight: 500 }}>Image Optimizer</Link>
              <Link href="/tools/json-formatter" style={{ color: '#38bdf8', fontWeight: 500 }}>JSON Formatter</Link>
              <Link href="/tools/qr-generator" style={{ color: '#10b981', fontWeight: 500 }}>QR Gen</Link>
              <Link href="/tools/safe-screen" style={{ color: '#ec4899', fontWeight: 500 }}>SafeScreen</Link>
              <Link href="/recommended" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Recommended</Link>
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
