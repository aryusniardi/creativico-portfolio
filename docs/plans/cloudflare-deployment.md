# Cloudflare deployment

## Goal

Deploy the portfolio and its EmDash CMS to Cloudflare with isolated preview and production environments:

- `development` → `https://creativico-portfolio-preview.aryusniardi15.workers.dev`
- `main` → `https://creativico-portfolio.aryusniardi15.workers.dev`

The legacy Pages project `creativico-portfolio` is updated by CI with a branch-specific 302 redirect to the matching Worker.

## Scope

- Astro Cloudflare Worker output.
- D1 database for EmDash records.
- R2 bucket for EmDash media.
- Native EmDash passkey login for `aryusniardi15@gmail.com`.
- GitHub Actions deploys for `main` and `development`.

## Non-goals

- A custom username/password authentication layer.
- Committing Cloudflare API, R2, D1, or Access credentials.
- Treating the static Pages project as the live CMS runtime.

## Acceptance checklist

- [x] Astro production config uses the Cloudflare adapter and server output.
- [x] Production Wrangler config has a D1 `DB` binding and R2 `MEDIA` binding.
- [x] Preview Wrangler config has isolated D1/R2 bindings or an explicit approved sharing decision.
- [x] D1 migrations are applied remotely for both environments.
- [x] `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist as GitHub Actions secrets.
- [x] `main` deploy succeeds at the production Worker URL.
- [x] `development` deploy succeeds at the preview Worker URL.
- [x] Initial admin is provisioned before public deployment and setup is closed.
- [x] `/_emdash/admin/login` accepts the registered passkey.
- [ ] CMS uploads persist in R2 and survive a new deployment.
- [ ] Legacy Pages URLs redirect to the matching Worker URL.

Manual production and preview deployments, setup closure, native one-time login, passkey registration/login, and media uploads have passed. CI branch deployment and post-deploy persistence are the remaining integration checks.

## Ownership and dependencies

- Parent: runtime configuration, cloud resources, seeding, credentials, deployment and integration verification.
- Lead: initial workflow, architecture decision and this plan.
- Security reviewer: read-only review of auth and deployment boundaries before deployment.
- Order: provision isolated stores, import seed/admin, build/review, deploy, verify authentication and media, push workflow to both branches, inspect both CI runs.

- [ ] GitHub Actions succeeds for both branches at the final deployed commit.
