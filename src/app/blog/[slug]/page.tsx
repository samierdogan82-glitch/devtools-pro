import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  return {
    title: `${postData.title} - DevTools Pro`,
    description: postData.excerpt,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link href="/blog" style={{ color: 'var(--accent-primary)', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Blog
      </Link>
      
      <article className="glass-panel" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{postData.title}</h1>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          {postData.date}
        </div>
        
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }} 
        />
      </article>

      <div style={{ marginTop: '3rem', padding: '2rem', border: '1px dashed var(--glass-border)', textAlign: 'center', color: 'var(--text-secondary)' }}>
        [AdSense Display Ad Placeholder]
      </div>
    </div>
  );
}
