# Sangria docs

The documentation site for **Sangria** — a team-chat workspace. Built with
[Next.js](https://nextjs.org) + [Fumadocs](https://fumadocs.dev). Content is MDX.

Two sections, switchable from the sidebar:

- **Help Center** (`content/docs/help`) — end-user guides.
- **Developer** (`content/docs/developer`) — architecture, data model, and conventions.

## Develop

```bash
bun install
bun run dev      # http://localhost:3000 (redirects /docs → /docs/help)
bun run build    # production build (also validates every MDX page)
```

## Self-host (part of the Sangria stack)

The site builds to a standalone Node server (`output: 'standalone'`) that listens
on **port 3002**. The Sangria app's `docker-compose.yml` runs this repo as a `docs`
service and the Kong gateway routes **https://docs.sangria.localhost** → `docs:3002`,
so the app links to the docs through the same gateway as everything else — no
private IPs, no separate hosting.

```bash
# from the sangria app repo (this repo must be a sibling: ../sangria-docs)
docker compose up --build docs      # or `docker compose up` for the whole stack
# docs.sangria.localhost is registered by the app's `npm run dev:setup`
```

Standalone, without the gateway:

```bash
docker build -t sangria-docs .
docker run --rm -p 3002:3002 sangria-docs   # http://localhost:3002/docs/help
```

The app reaches the docs via `NEXT_PUBLIC_DOCS_URL` (set to
`https://docs.sangria.localhost` in the compose stack; override for other envs).

This repo reads the same variable for its own public origin, which `sitemap.xml` and
the `Sitemap:` line in `robots.txt` need as an absolute URL. On Vercel it's derived
from `VERCEL_PROJECT_PRODUCTION_URL` automatically. Anywhere else, pass it at **build**
time — `NEXT_PUBLIC_*` is inlined during the build, so a runtime value in compose
arrives too late. Without it the sitemap is empty and robots.txt omits the line,
rather than publishing URLs for a domain that isn't yours.

## Write a page

1. Add an `.mdx` file under `content/docs/help/` or `content/docs/developer/`.
2. Give it two-field frontmatter:

   ```mdx
   ---
   title: Your Page
   description: One sentence, ends with a period.
   ---
   ```

3. Register it in the section's `meta.json` `pages` array (this controls sidebar order).
4. In the body, plain Markdown plus `<Callout>` and `<Cards>/<Card>` are available.
   Internal links are absolute: `/docs/help/<slug>` or `/docs/developer/<slug>`.

## Layout

| Path | What it is |
| --- | --- |
| `content/docs/help/` | Help Center pages + `meta.json` (root folder → sidebar tab) |
| `content/docs/developer/` | Developer pages + `meta.json` (root folder → sidebar tab) |
| `src/app/(home)` | Landing page |
| `src/app/docs` | Docs layout + catch-all page |
| `src/lib/shared.ts` | App name + GitHub repo config |
| `src/lib/layout.shared.tsx` | Shared nav/layout options |
| `source.config.ts` | Fumadocs MDX config (frontmatter schema) |

Search is powered by Orama (local, no external service). Each page also exposes an
`llms.txt` / Markdown view for LLMs automatically.
