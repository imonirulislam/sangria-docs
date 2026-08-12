import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/shared';

// Search engines welcome; model-training crawlers not. Google-Extended and
// Applebot-Extended are training-only tokens, so Search and Siri still work.
// Not listed on purpose: ChatGPT-User, Claude-User and OAI-SearchBot fetch a page
// when someone asks about Sangria, which is what llms.txt is for.
const TRAINING_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'FacebookBot',
  'Bytespider',
  'Amazonbot',
  'cohere-ai',
  'Diffbot',
  'Omgilibot',
  'Timpibot',
  'AI2Bot',
  'PanguBot',
  'Webzio-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...TRAINING_CRAWLERS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
