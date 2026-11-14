# Apple Music layout and portfolio content

## Goal
Review every screen; use Apple Music hierarchy, spacing, restrained materials, and accessible controls inside the original always-mobile phone simulation. Support ordered images and videos in each project. Make portfolio data editable without changing menus or section titles.

## Non-goals
Native iOS API parity, invented portfolio claims, public unauthenticated writes, deployment.

## Acceptance
- All six views, navigation, mini player, viewer, and empty states use consistent layout.
- Preserve the mobile phone simulation on every viewport, including desktop; no pulse dots, decorative sparkles, or unsupported availability claims.
- Project media can mix images, direct videos, and external links; ordered previous/next controls, intrinsic media ratio, accessible dismissal.
- Content has one source; no hardcoded profile or editorial descriptions in components.
- Latest content imported only from an identified source; missing source recorded.
- Editing path is documented honestly and validated; CMS choice pending user input.
- Typecheck, production build, mixed-media checks, all-screen browser checks at 390/768/1440 widths.

## Ownership and dependencies
- Root: UI, shell, player, mixed-media viewer, integration and browser checks.
- content_architecture (lead): inspect editor/data options; coordinate model changes before edits.
- Source: user-supplied updated 38-page PDF in Downloads. EmDash chosen; local SQLite/local media with static publishing export. Production runtime/storage/auth not provisioned.
- No mapped Obsidian hub exists for this repository; do not edit unrelated Portfolio hub.

## Checklist
- [x] Inspect current screens, state, content and Apple guidance.
- [x] Implement responsive Apple Music layout and remove decorative UI; compare all four supplied screenshot files found in Downloads.
- [x] Implement ordered mixed-media viewer and fix nested navigation.
- [x] Centralize editable data; configure local EmDash with named reference pickers, ordered project media, repeaters, uploads, and validated static export.
- [x] Import verified latest source content: 8 talents, 3 projects, 15 images/original-release links; direct-video support tested with a local fixture.
- [x] Verify live CMS read, uploaded media/export, production build, TypeScript, unit/integration checks, all screens at three widths, and direct-video playback. Update README and source provenance.
