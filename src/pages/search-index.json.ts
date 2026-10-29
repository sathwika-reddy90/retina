import type { APIRoute } from 'astro';
import { staticPages } from '@/data/pages';
import { products, categoryById } from '@/data/products';
import { jobs, jobCategory } from '@/data/jobs';
import { posts, announcements } from '@/data/news';
import { investorDocuments, type DocBlock } from '@/data/investors';
import { docUrl } from '@/data/site';

type Entry = { t: string; u: string; k: string; d?: string };

const IR_SECTION: Record<string, string> = {
  policies: 'Policies',
  'shareholding-pattern': 'Shareholding pattern',
  'financial-results-yearly': 'Financial Results – Yearly',
  'financial-results-half-yearly': 'Financial Results – Half Yearly',
  notices: 'Notices',
  agm: 'AGM',
  egm: 'EGM',
  others: 'Announcements',
  board: 'Board meetings',
  'financial-results': 'Financial Results',
};

export const GET: APIRoute = () => {
  const entries: Entry[] = [];

  for (const p of products) {
    const cat = categoryById(p.category);
    entries.push({
      t: p.name,
      u: p.href ?? `/products/#${cat.id}`,
      k: 'Product',
      d: [cat.name, p.warranty ? `${p.warranty} years warranty` : '', p.summary ?? '', p.features.join(', ')].filter(Boolean).join(' · '),
    });
  }
  for (const s of staticPages) entries.push({ t: s.title, u: s.url, k: 'Page', d: s.description });
  for (const j of jobs) entries.push({ t: j.title, u: `/jobs/${j.slug}/`, k: 'Job', d: [j.type, j.location, jobCategory(j)].filter(Boolean).join(' · ') });
  for (const p of posts) entries.push({ t: p.title, u: `/${p.slug}/`, k: 'News', d: p.excerpt });
  for (const a of announcements) entries.push({ t: a.label, u: docUrl(a.href), k: 'Document', d: 'General announcement' });

  const seen = new Set<string>();
  for (const [key, blocks] of Object.entries(investorDocuments)) {
    let heading = '';
    for (const b of blocks as DocBlock[]) {
      if (b.type === 'heading' && b.level === 2) heading = b.text;
      const items = b.type === 'docs' ? b.items : b.type === 'linktable' ? b.rows.flat(2) : [];
      for (const d of items) {
        const id = `${d.label}|${d.href}`;
        if (seen.has(id)) continue;
        seen.add(id);
        entries.push({ t: d.label, u: docUrl(d.href), k: 'Document', d: [IR_SECTION[key] ?? 'Investor Relations', heading].filter(Boolean).join(' · ') });
      }
    }
  }

  return new Response(JSON.stringify(entries), { headers: { 'Content-Type': 'application/json' } });
};
