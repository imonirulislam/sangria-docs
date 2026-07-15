import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Fraunces } from 'next/font/google';

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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
