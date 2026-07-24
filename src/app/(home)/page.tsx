import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Code2,
  Hash,
  LifeBuoy,
  MessageSquare,
  Plug,
  Radio,
  Search,
} from 'lucide-react';

const features = [
  { icon: Hash, label: 'Channels' },
  { icon: MessageSquare, label: 'Direct messages' },
  { icon: Radio, label: 'Huddles' },
  { icon: Bell, label: 'Notifications' },
  { icon: Search, label: 'Search' },
  { icon: Plug, label: 'Integrations' },
];

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center overflow-hidden px-4">
      {/* Berry glow behind the hero — adapts to light/dark via the primary token. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_-5%,color-mix(in_oklab,var(--color-fd-primary)_20%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[520px] w-full bg-[radial-gradient(30%_40%_at_82%_12%,color-mix(in_oklab,var(--color-brand-citrus)_14%,transparent),transparent_70%)]"
      />

      <section className="mx-auto flex max-w-3xl flex-col items-center pt-20 pb-14 text-center sm:pt-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3.5 py-1.5 text-xs font-medium text-fd-muted-foreground backdrop-blur">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="size-3.5 rounded-[3px]" />
          Sangria · Documentation
        </span>

        <h1 className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-fd-foreground sm:text-6xl">
          Everything about{' '}
          <span className="text-fd-primary">Sangria</span>, in one place.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-fd-muted-foreground">
          A team-chat workspace with channels, direct messages, huddles, and
          integrations. Guides for the people using it — and reference for the
          people building it.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/help"
            className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Browse the guides <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/developer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            Developer docs
          </Link>
        </div>
      </section>

      {/* Section cards */}
      <section className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <SectionCard
          href="/docs/help"
          icon={LifeBuoy}
          title="Help Center"
          body="How to use Sangria — workspaces, channels, DMs, huddles, notifications, and more."
          cta="Browse guides"
        />
        <SectionCard
          href="/docs/developer"
          icon={Code2}
          title="Developer Docs"
          body="Architecture, the Convex data model, conventions, and how features are wired."
          cta="Read the internals"
        />
      </section>

      {/* Feature strip */}
      <section className="mx-auto mt-14 mb-20 w-full max-w-3xl">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
          What's inside
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {features.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-card px-3.5 py-1.5 text-sm text-fd-muted-foreground"
            >
              <Icon className="size-3.5 text-fd-primary" />
              {label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionCard({
  href,
  icon: Icon,
  title,
  body,
  cta,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 text-left transition-all hover:-translate-y-1 hover:border-fd-primary/40 hover:shadow-lg hover:shadow-fd-primary/5"
    >
      <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary transition-colors group-hover:bg-fd-primary group-hover:text-fd-primary-foreground">
        <Icon className="size-5" />
      </span>
      <h2 className="font-display text-xl font-semibold text-fd-foreground">{title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">{body}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-fd-primary">
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
