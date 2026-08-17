import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devtools-pro.com';
  
  const posts = getSortedPostsData().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const routes = [
    '',
    '/blog',
    '/tools/password-generator',
    '/tools/text-analyzer',
    '/tools/seo-meta-generator',
    '/tools/safe-screen',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...posts];
}
