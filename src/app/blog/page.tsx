import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog - DevTools Pro",
  description: "Read our latest articles on web development, productivity, and SEO.",
};

export default function BlogList() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Blog</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {allPostsData.map(({ slug, date, title, excerpt }) => (
          <Link href={`/blog/${slug}`} key={slug} style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>{title}</h2>
              <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>{date}</small>
              <p style={{ lineHeight: '1.6' }}>{excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {allPostsData.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No articles found.</p>
      )}
    </div>
  );
}
