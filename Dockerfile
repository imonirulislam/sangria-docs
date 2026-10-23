# Self-host the docs as a small Node service.
FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

# Runner: Node serves the standalone bundle. `output: 'standalone'` does NOT
# include .next/static or public/, so copy them into place explicitly.
# Pinned to an exact patch release so a Node.js security fix is guaranteed; bump
# with each security release (24.22.1: October 2026, CVE-2026-111497).
FROM node:24.22.1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3002
CMD ["node", "server.js"]
