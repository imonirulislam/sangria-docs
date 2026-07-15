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
