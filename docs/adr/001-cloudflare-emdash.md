# ADR 001: Cloudflare Worker runtime for EmDash

Status: accepted
Date: 2026-11-15

## Context

The portfolio currently builds as a static Astro site and runs EmDash with a local SQLite database and local upload storage during development. A live CMS needs a server runtime, durable database, durable media storage, and an authentication boundary. Static output cannot provide those services.

The project already depends on `@astrojs/cloudflare` and `@emdash-cms/cloudflare`, which provide the Astro Worker adapter, D1 adapter, R2 adapter, and optional Cloudflare Access authentication.

## Decision

Deploy the Astro application as a Cloudflare Worker. Use D1 for EmDash data and R2 for media. Keep branch environments separate:

- `main` deploys the production Worker.
- `development` deploys the preview Worker with `CLOUDFLARE_ENV=preview`.
- The existing Pages project receives a branch-specific redirect to the matching Worker URL so older Pages URLs continue to resolve.

Use EmDash's native passkey authentication for the initial owner account (`aryusniardi15@gmail.com`). Do not add a custom username/password system. Cloudflare credentials stay in GitHub Actions secrets and Wrangler secrets; no API or S3 secret is committed.

## Consequences

The Worker deployment requires D1 and R2 bindings in Wrangler configuration and remote migrations before the first production login. Each environment has independent durable bindings. The CMS is live at `/_emdash/admin/login`; the initial owner is provisioned before public deployment with setup closed, then receives a short-lived native single-use sign-in link to register a passkey. Email delivery is not required for this one-time handover and remains unconfigured.

The Pages redirect is a compatibility layer, not the application runtime. It must be updated after each Worker deploy until the old Pages hostname is replaced with a direct Worker route or custom domain.

Media delivery uses EmDash’s native Cloudflare Images binding to produce size-bound WebP responses while preserving R2 originals. Failed transforms fall back to the original image. No Images subscription upgrade is performed. YouTube embeds are created from allowlisted provider URLs only while the viewer is open.

## Alternatives considered

- Static Pages only: rejected because EmDash's database, uploads, authentication, and admin API need a server runtime.
- A separate CMS service: rejected because the repository already includes EmDash's Cloudflare adapters and schema.
- Username/password auth: rejected because EmDash's supported built-in mode is passkey; Cloudflare Access is an optional external IdP boundary, not a local password store.
