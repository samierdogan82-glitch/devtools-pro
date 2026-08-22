'use client';

import React from 'react';

interface AdPlacementProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ 
  slot = "1234567890", 
  format = "auto",
  className = "" 
}) => {
  return (
    <div className={`ad-container ${className}`} style={{
      margin: '2rem auto',
      padding: '1rem',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.015)',
      border: '1px dashed rgba(255, 255, 255, 0.08)',
      textAlign: 'center',
      minHeight: format === 'horizontal' ? '90px' : '250px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <span style={{
        position: 'absolute',
        top: '6px',
        right: '12px',
        fontSize: '0.65rem',
        color: 'var(--text-secondary)',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        opacity: 0.6
      }}>
        Advertisement
      </span>

      {/* Google AdSense Responsive Unit */}
      <ins className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-7959811775752406"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
