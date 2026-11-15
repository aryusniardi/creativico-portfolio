# ON REPEAT — Creativico

Victor Decha Zhevanya’s portfolio, built with Astro 7, React 19 and Tailwind CSS. Content and photographs were imported from the user’s updated 38-page 2026 portfolio: 8 talents, 3 projects and 15 media items. See [source details](docs/portfolio-source.md).

## Layout and interaction

Apple Music provides the layout reference: large page titles, artwork grids, circular talent portraits, flat media lists and an album-style project page. The mobile simulation stays at phone width on every screen. Desktop centers a 414 × 852 phone frame; smaller screens use the same mobile layout full bleed. The floating app bar and mini player use the installed Liquid Glass components with an explicit dark theme. Media viewing stays inside the phone frame. Scrollbars and the simulated status row are hidden. Touch uses native scrolling; mouse click-and-drag scrolls content and artwork rails without activating cards. There are no decorative pulses or invented availability indicators.

Menus and section titles are code-owned. Profile details, photos, talents, projects, notes, roles, credits, metrics, awards and ordered media are content-owned. A single React content context supplies all screens and the viewer.

## Project media

A project’s `workIds` is its ordered media list. Each media item has one kind:

- `image`: opens `imageUrl` (or the thumbnail) at its natural proportions, with alt text.
- `video`: plays a directly hosted `videoUrl`, with optional poster, captions and duration.
- `external`: opens the original platform’s URL. The PDF provides YouTube/Instagram links, not source MP4s.

Images and videos can be mixed in any order. Previous/next follows the project order. The viewer supports keyboard dismissal, focus restoration, always-visible creative notes and an accessible scrubber. Media, controls and notes remain in one vertical scroll flow without overlap. Direct video continues through the mini player when the viewer closes; changing to an image stops it.

## Content management

### EmDash editing

EmDash was previously installed but unconfigured. It now uses local SQLite (`data.db`) and local upload storage (`uploads/`). The initial portfolio photographs are registered in its Media Library. These local files are ignored by Git; back up the database and uploads together.

1. Run `npm run cms:seed` once to initialize the portfolio. Repeating it skips existing entries, preserving edits.
2. Run `npm run dev`. Open `/_emdash/admin/setup` using the `localhost` URL and create your owner account/passkey. The current preview is `http://localhost:4322/_emdash/admin/setup`. No owner account has been created for you.
3. Edit the existing **Profile** record for biography, photo, contacts, social links, tags, five disciplines and awards.
4. Add or edit **Talents**, **Projects** and **Media** using the forms. Portraits, covers, images and videos use upload/library selectors; roles, credits, metrics and awards use repeatable fields. Menus and section headings remain fixed.
5. For a media item, select **Image**, **Video**, or **External**, choose its project, add its thumbnail/source and optional caption/alt text, then publish. Choose talents using the named picker. The project’s **Ordered media** field supports selection and reordering; its project/media relationship is shared, so selecting a project on the media item also links it to that project.
6. Publish changed records in EmDash. Reload the local site to see the published changes. Drafts stay out of the public dataset. Unpublish linked media before unpublishing its project; the export rejects broken published references.
7. On the deployed CMS, publishing updates the matching environment’s website on its next request. Local editing uses a separate SQLite database; `npm run cms:export` remains available to create a validated fallback snapshot and copy local uploads into `public/media/uploads`. It is not required for online publishing.

There is no JSON or internal-ID entry required in the editor. New records use EmDash’s normal title/slug flow and dynamic reference pickers. Drafts are excluded from the public website.

Production and preview use Cloudflare Workers with separate D1 databases and R2 buckets. Local editing remains independent. See [deployment and CMS access](docs/cloudflare-deployment.md).


## Development and verification

Use Node >=22.23.4 (Astro’s requirement); this workspace also has a compatible `/opt/homebrew/bin/node`.

```sh
npm install
npm run cms:seed
npm run dev
npm run build
```

Focused checks:

```sh
node node_modules/typescript/bin/tsc --noEmit
node --test tests/*.test.mjs
python3 tests/browser.py --url http://localhost:4321
```

The browser check requires Python Playwright and Chromium. `tests/browser-media.py` tests direct-video playback against the built site at port 4323 using a local test fixture; its module docstring describes setup. It never changes the real portfolio or database.

## Deployment

Push to `development` deploys preview; push or merge to `main` deploys production through `.github/workflows/deploy.yml`. The pipeline validates types and content tests, builds the Worker, deploys it, and updates the corresponding legacy Pages redirect. See [deployment details](docs/cloudflare-deployment.md).

## Log

- 2026-11-15 — Rebuilt all portfolio layouts, imported the updated PDF’s actual content and assets, added ordered mixed-media viewing, and connected local EmDash editing. Verified production build, TypeScript, media helpers, all-screen responsive navigation and direct-video playback.

- 2026-11-15 — Restored the always-mobile phone simulation and actual Liquid Glass navigation/mini player after correcting an unintended desktop redesign.

- 2026-11-15 — Hid scrollbars and the simulated status row; added mouse drag scrolling alongside native touch gestures; made Notes permanent and fixed viewer content overlap.

- 2026-11-15 — Enabled live Cloudflare Workers/EmDash with isolated D1/R2 production and preview, native passkey admin access, draft revisions before publishing, and GitHub Actions deployment for main/development. Documented account separation and CMS access.
