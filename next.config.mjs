import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Self-host build: emit a minimal standalone server (.next/standalone) so the
  // Docker image ships only the files it needs. The Dockerfile copies .next/static
  // and public/ alongside it (Next does not include those in standalone).
  output: 'standalone',
  async redirects() {
    // Bare /docs lands on the Help Center tab.
    return [{ source: '/docs', destination: '/docs/help', permanent: false }];
  },
};

export default withMDX(config);
