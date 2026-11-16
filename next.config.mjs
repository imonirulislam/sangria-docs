import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isDev = process.env.NODE_ENV === 'development';

// No nonce: the pages are static, and a nonce would force every page to render
// per request. So inline scripts (Next's payload, the theme script) need 'unsafe-inline'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
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
