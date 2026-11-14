# ON REPEAT — Creativico Creative Talent Portfolio

An editorial, cinematic, interactive creative talent portfolio built with **Astro 5 + React 19 + Tailwind CSS + Lucide Icons** and deployed to **Cloudflare Pages**.

Inspired by music library/player interaction patterns:
- **Talents** = Artists
- **Releases/Campaigns** = Albums
- **Individual Videos** = Tracks
- **Viewer** = Now Showing (9:16 vertical video player with scrubber, roles, and Creative Notes drawer)
- **Persistent Player** = Mini-Viewer anchored above tab bar

---

## Architecture & Layout Strategy

- **Desktop / Tablet**: Constrained inside an iPhone-sized centered frame (`max-width: 430px`, `max-height: 860px`) with a subtle ambient blurred backdrop reflecting project art and simulated dynamic island.
- **Mobile (<=600px)**: Seamless full-bleed `100dvh` experience without redundant simulated bezels.
- **Translucent Glass Surface**: Layered backdrop-filters (`backdrop-filter: blur(24px) saturate(1.5)`) with graceful fallbacks.

---

## Content Model & Structure

Seed content is located in `src/data/mock.ts`:
- **3 Talents**: Maya Aditya (Creator), Rio Satria (Musician), Chelsea Tan (Actor).
- **4 Releases**: *After Hours Echo* (Campaign), *Midnight Frequencies* (Live Series), *Solitude in Motion* (Brand Collab), *Unrehearsed Monologues* (BTS Confessions).
- **8 Works**: 9:16 vertical video tracks with role attribution and strategic rationale.

### Replacing Seed Data

To customize with real talent and campaign content, edit `src/data/mock.ts` or connect to EmDash CMS:
- Update `TALENTS` array with talent details, profile photos, and bios.
- Update `RELEASES` array with campaign objectives, insights, concepts, outcomes, and credits.
- Update `WORKS` array with vertical video URLs, poster thumbnails, and duration.

---

## Development & Build Commands

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Production build for Cloudflare Pages
npm run build

# Preview build locally
npm run preview
```

---

## Deployment to Cloudflare Pages

Project is configured with `@astrojs/cloudflare` server adapter and `wrangler.toml`:

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=creativico-portfolio
```

Free Tier compliant: Zero paid add-ons.
