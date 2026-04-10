# Project Guidelines

## Code Style

- Use TypeScript and keep changes behavior-preserving unless the task explicitly asks for a functional change.
- Prefer the existing component boundaries in [src/components/](src/components/) and [src/components/ui/](src/components/ui/) instead of introducing new patterns.
- Use the shared `cn` helper from [src/lib/utils.ts](src/lib/utils.ts) for Tailwind class composition.
- Follow the current UI language when touching visuals; avoid introducing a new design system for isolated edits.

## Architecture

- This is a Next.js 16 App Router portfolio. Route and layout work lives under [src/app/](src/app/), with locale-aware routes in [src/app/[lang]/](src/app/%5Blang%5D/).
- Locale data and dictionaries live in [src/i18n/](src/i18n/). In layouts and pages, `params` are Promises and should be awaited.
- Shared providers live in [src/providers/](src/providers/); server actions live in [src/actions/](src/actions/).
- Environment validation is centralized in [src/env.ts](src/env.ts). Keep secret access there instead of scattering `process.env` usage.
- Locale redirects and public asset exclusions are handled in [src/proxy.ts](src/proxy.ts); do not reintroduce `middleware.ts`.

## Build and Test

- Use `pnpm` for all package operations.
- Run `pnpm dev` for local development, `pnpm lint` before handoff, and `pnpm build` to verify production output.
- No automated test script is defined in [package.json](package.json) yet.

## Conventions

- Prefer `@/` imports for code under `src/`.
- Use file-based metadata assets such as [src/app/[lang]/opengraph-image.ts](src/app/%5Blang%5D/opengraph-image.ts) and [src/app/[lang]/twitter-image.ts](src/app/%5Blang%5D/twitter-image.ts); avoid hardcoding generated image route URLs in metadata.
- Keep the app icon convention in [src/app/icon.svg](src/app/icon.svg) when working on metadata or locale-aware routes.
- Follow the contact flow pattern in [src/actions/sendMessage.ts](src/actions/sendMessage.ts): schema validation, rate limiting, localized errors, and explicit runtime error handling.
- When adding utilities or UI primitives, prefer the existing structure in [src/lib/](src/lib/) and [src/components/](src/components/).

## Reference Files

- [README.md](README.md) contains the generic starter project notes.
- [src/app/[lang]/layout.tsx](src/app/%5Blang%5D/layout.tsx) is the best reference for metadata, fonts, providers, and locale-aware layout behavior.
