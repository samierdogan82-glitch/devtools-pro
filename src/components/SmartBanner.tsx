import Link from 'next/link';

type BannerType = 'parental' | 'seo' | 'password' | 'grammar' | 'ecommerce' | 'developer' | 'design';

interface SmartBannerProps {
  type: BannerType;
}

const bannerConfig = {
  parental: {
    icon: '🛡️',
    title: 'Protect Your Kids Online',
    description: 'Get total peace of mind with the world\'s leading parental control software.',
    cta: 'Learn More',
    link: '/recommended', // Affiliate link placeholder
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 63, 94, 0.1))',
    borderHover: 'rgba(236, 72, 153, 0.5)'
  },
  seo: {
    icon: '🚀',
    title: 'Supercharge Your Website',
    description: 'Host on ultra-fast cloud servers and rank higher on Google.',
    cta: 'Start Free Trial',
    link: '/recommended',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
    borderHover: 'rgba(16, 185, 129, 0.5)'
  },
  password: {
    icon: '🔐',
    title: 'Never Forget a Password',
    description: 'Store all your secure passwords in one encrypted vault.',
    cta: 'Get 1Password',
    link: '/recommended',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
    borderHover: 'rgba(59, 130, 246, 0.5)'
  },
  grammar: {
    icon: '✍️',
    title: 'Write Like a Pro',
    description: 'Ensure your essays and articles are flawless with advanced AI grammar checking.',
    cta: 'Try for Free',
    link: '/recommended',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.1))',
    borderHover: 'rgba(139, 92, 246, 0.5)'
  },
  ecommerce: {
    icon: '🛍️',
    title: 'Start Selling Online Today',
    description: 'Build your dream e-commerce store in minutes with the world\'s leading platform.',
    cta: 'Start Free Trial',
    link: '/recommended',
    gradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(202, 138, 4, 0.1))',
    borderHover: 'rgba(234, 179, 8, 0.5)'
  },
  developer: {
    icon: '☁️',
    title: 'Deploy Faster, Scale Easier',
    description: 'Get $200 free credit to host your next big project on premium cloud infrastructure.',
    cta: 'Claim Free Credit',
    link: '/recommended',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(14, 165, 233, 0.1))',
    borderHover: 'rgba(56, 189, 248, 0.5)'
  },
  design: {
    icon: '🎨',
    title: 'Design Like a Pro',
    description: 'Create stunning graphics, videos, and presentations in minutes with premium assets.',
    cta: 'Try Canva Pro',
    link: '/recommended',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))',
    borderHover: 'rgba(236, 72, 153, 0.5)'
  }
};

export default function SmartBanner({ type }: SmartBannerProps) {
  const config = bannerConfig[type];

  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '1.5rem', 
        textAlign: 'center',
        background: config.gradient,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '4rem', opacity: 0.1, transform: 'rotate(15deg)' }}>
        {config.icon}
      </div>
      
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{config.icon}</div>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', position: 'relative', zIndex: 1 }}>{config.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1, lineHeight: 1.5 }}>
        {config.description}
      </p>
      
      <Link 
        href={config.link} 
        className="btn btn-primary" 
        style={{ 
          display: 'block', 
          width: '100%', 
          position: 'relative', 
          zIndex: 1,
          background: 'var(--bg-primary)',
          border: `1px solid ${config.borderHover}`
        }}
      >
        {config.cta}
      </Link>
      
      <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.5 }}>
        Sponsored
      </div>
    </div>
  );
}
