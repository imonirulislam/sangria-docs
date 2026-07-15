import Link from 'next/link';
import { BookOpen, Code2, LifeBuoy } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground">
          <BookOpen className="size-3.5" /> Documentation
        </span>
        <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Sangria documentation
        </h1>
        <p className="mb-10 text-balance text-lg text-fd-muted-foreground">
          Everything about Sangria — a team-chat workspace with channels, direct messages,
          huddles, and integrations. Guides for people using the app, and reference for people
          building it.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <Link
          href="/docs/help"
          className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-6 text-left transition-colors hover:bg-fd-accent"
        >
          <LifeBuoy className="mb-3 size-6 text-fd-primary" />
          <h2 className="mb-1 text-lg font-semibold">Help Center</h2>
          <p className="text-sm text-fd-muted-foreground">
            How to use Sangria — workspaces, channels, DMs, huddles, notifications, and more.
          </p>
          <span className="mt-4 text-sm font-medium text-fd-primary group-hover:underline">
            Browse guides →
          </span>
        </Link>

        <Link
          href="/docs/developer"
          className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-6 text-left transition-colors hover:bg-fd-accent"
        >
          <Code2 className="mb-3 size-6 text-fd-primary" />
          <h2 className="mb-1 text-lg font-semibold">Developer Docs</h2>
          <p className="text-sm text-fd-muted-foreground">
            Architecture, the Convex data model, conventions, and how features are wired.
          </p>
          <span className="mt-4 text-sm font-medium text-fd-primary group-hover:underline">
            Read the internals →
          </span>
        </Link>
      </div>
    </main>
  );
}
