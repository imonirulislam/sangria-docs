export const appName = 'Sangria';

// Absolute origin for the sitemap and robots.txt. Vercel sets its own production
// host; elsewhere pass NEXT_PUBLIC_DOCS_URL at build time. Deliberately no default:
// a guessed domain would emit a sitemap of URLs for someone else's site, which
// crawlers reject — better to publish no sitemap than a wrong one.
const configuredUrl =
  process.env.NEXT_PUBLIC_DOCS_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = configuredUrl?.replace(/\/$/, '');
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// GitHub info for the repo link in the nav.
export const gitConfig = {
  user: 'imonirulislam',
  repo: 'sangria-docs',
  branch: 'main',
};
