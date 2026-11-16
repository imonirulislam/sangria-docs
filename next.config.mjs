import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// The Content-Security-Policy is set per request in proxy.ts, where its nonce is made.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Self-host build: emit a minimal standalone server (.next/standalone) so the
  // Docker image ships only the files it needs. The Dockerfile copies .next/static
  // and public/ alongside it (Next does not include those in standalone).
  output: 'standalone',
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    // Bare /docs lands on the Help Center tab.
    return [{ source: '/docs', destination: '/docs/help', permanent: false }];
  },
};

export default withMDX(config);
