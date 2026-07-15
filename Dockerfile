# Self-host the docs as a small Node service.
FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

# Runner: Node serves the standalone bundle. `output: 'standalone'` does NOT
# include .next/static or public/, so copy them into place explicitly.
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3002
CMD ["node", "server.js"]
