// @ts-check
import { defineConfig } from 'astro/config';

// Routes intentionally mirror the existing retinapaints.com URL structure
// (trailing slashes, legacy slugs such as /products/emulsion/whether-expert/
// and /elementor-3030/) so existing links, bookmarks and search rankings keep working.
export default defineConfig({
  site: 'https://www.retinapaints.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  redirects: {
    '/about-us/': '/about-us/company-profile/',
    '/blog/': '/news-and-events/',
    '/investor-relations/financial-results/': '/elementor-3030/',
  },
});
