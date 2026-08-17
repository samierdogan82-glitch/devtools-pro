export const metadata = {
  title: "Recommended Tools & Services - DevTools Pro",
  description: "A curated list of the best tools, hosting, and services we use and recommend for developers and marketers.",
};

export default function RecommendedTools() {
  const affiliateProducts = [
    {
      name: "Hostinger Web Hosting",
      description: "The fastest, most reliable and affordable web hosting for launching your next big project. Perfect for WordPress and Custom Apps.",
      price: "From $2.99/mo",
      link: "#affiliate-link-hostinger", // To be replaced with real affiliate link
      icon: "🚀",
      tag: "Top Pick"
    },
    {
      name: "1Password",
      description: "Stop memorizing passwords. Store your generated passwords securely with the industry's leading password manager.",
      price: "14-day Free Trial",
      link: "#affiliate-link-1password",
      icon: "🔐",
      tag: "Security"
    },
    {
      name: "Semrush",
      description: "The ultimate all-in-one SEO toolkit. Do keyword research, track rankings, and outsmart your competitors instantly.",
      price: "Free Trial",
      link: "#affiliate-link-semrush",
      icon: "📈",
      tag: "SEO"
    },
    {
      name: "NordVPN",
      description: "Protect your privacy online and bypass geo-restrictions with blazing fast, secure VPN servers worldwide.",
      price: "68% OFF + 3 Months",
      link: "#affiliate-link-nordvpn",
      icon: "🛡️",
      tag: "Privacy"
    }
  ];

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>Recommended Tools</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
        We only recommend products that we personally use and trust. If you purchase through these links, we may earn a small commission at no extra cost to you.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {affiliateProducts.map((product) => (
          <div key={product.name} className="glass-panel" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'var(--accent-primary)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {product.tag}
            </div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{product.icon}</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>{product.price}</span>
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Get Started &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
