import type { APIRoute } from 'astro';
import { staticPages } from '@/data/pages';
import { products } from '@/data/products';
import { jobs } from '@/data/jobs';
import { posts } from '@/data/news';

export const GET: APIRoute = ({ site }) => {
  const urls = [
    ...staticPages.map((p) => p.url),
    ...products.filter((p) => p.href).map((p) => p.href!),
    ...jobs.map((j) => `/jobs/${j.slug}/`),
    ...posts.map((p) => `/${p.slug}/`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(urls)].map((u) => `  <url><loc>${new URL(u, site).href}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
