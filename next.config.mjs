import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    // Bare /docs lands on the Help Center tab.
    return [{ source: '/docs', destination: '/docs/help', permanent: false }];
  },
};

export default withMDX(config);
