import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

// Every docs page plus the landing page. No lastModified: fumadocs reads it from
// git, which neither build has (.dockerignore drops .git; Vercel shallow-clones),
// and a build-time stamp would claim the whole site changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return [
    { url: siteUrl },
    ...source.getPages().map((page) => ({ url: `${siteUrl}${page.url}` })),
  ];
}
