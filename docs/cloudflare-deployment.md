# Cloudflare deployment and EmDash

This is a personal Cloudflare account, separate from WKND work. Account ID: `7a9dbc1531454c279517c126e7bb2045`. Credentials belong in secret stores, never this document or memory files.

| Branch | Website | CMS |
| --- | --- | --- |
| `main` | https://creativico-portfolio.aryusniardi15.workers.dev | https://creativico-portfolio.aryusniardi15.workers.dev/_emdash/admin |
| `development` | https://creativico-portfolio-preview.aryusniardi15.workers.dev | https://creativico-portfolio-preview.aryusniardi15.workers.dev/_emdash/admin |

The old `creativico-portfolio.pages.dev` and `development.creativico-portfolio.pages.dev` addresses redirect to the corresponding Worker. The original Pages project used manual uploads and had no Git source, so merges did not deploy anything.

## Automatic deployment

GitHub Actions runs on pushes to `main` and `development`. Each run installs the lockfile, checks TypeScript, runs content tests, builds Astro, deploys the Worker, and updates the legacy Pages redirect. Deployments for each branch are serialized. `CLOUDFLARE_ENV=preview` is set before building development, because the generated Wrangler configuration selects the environment at build time.

Repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. The dedicated `creativico-github-actions` token has Workers Editor, Pages Write, and Account Settings Read permissions for this account. The original personal token is IP-restricted and stays separate; GitHub-hosted runners use the dedicated CI token. R2 S3 access keys are not needed at runtime: the Worker uses a native bucket binding.

Production and preview have independent D1 databases and R2 buckets named `creativico-portfolio-production` and `creativico-portfolio-preview`. Local development retains SQLite and local uploads. Builds never seed or overwrite remote editorial data. EmDash applies compatible pending core migrations on first request; inspect migration requirements before upgrading EmDash.

## CMS access and publishing

Admin email: `aryusniardi15@gmail.com`. EmDash uses native passkeys, not a username/password. The initial admin is provisioned before public deployment to close the first-user setup route. A short-lived, single-use native EmDash sign-in link provides initial access; register a passkey at `/_emdash/admin/settings/security` immediately after signing in. No bootstrap tokens are committed. Each environment needs its own passkey because credentials are bound to its hostname.

The login route is `/_emdash/admin/login`; setup is `/_emdash/admin/setup` and is closed after provisioning. APIs are under `/_emdash/api/`. Email delivery is not configured, so requesting emailed magic links is unavailable. Losing all passkeys requires an administrator to issue a new native recovery link through the database or configure an email provider.

All four collections enable EmDash revisions, so saving stages an unpublished edit. Publishing in the online CMS updates the matching website on its next request. Drafts stay private. Images and uploaded files persist in R2. Preview edits do not change production content. `src/data/content.json` is only the fallback before initial content import; it does not override existing published CMS data.

## Verification

Before pushing, run the production and preview builds, TypeScript, and `node --test tests/*.test.mjs`. After deploying, check the website, protected CMS login, setup closure, published content and an R2-backed media URL in each environment. Verify the GitHub Actions run on both branches before treating automatic deployment as operational.

Verified 2026-11-15: both branch workflows succeeded at `69f4084`; live passkey registration/login, one-time-link reuse rejection, upload/download, preview draft privacy and publication, legacy redirects, and three portfolio viewports passed. Test uploads were checked after CI redeployment before cleanup.
