import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Fraunces } from 'next/font/google';
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ['latin'],
});

// Warm display serif for the wordmark, hero, and page titles. Exposed as
// `--font-display`; applied via the `.font-display` utility in global.css.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Reading the request makes every page render per request, which the CSP nonce needs.
export default async function Layout({ children }: LayoutProps<'/'>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return (
    <html
      lang="en"
      className={`${inter.className} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ nonce }}>{children}</RootProvider>
      </body>
    </html>
  );
}
