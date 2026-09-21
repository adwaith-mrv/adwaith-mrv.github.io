# Portfolio Cleanup & Branch Management Log

This document details the portfolio directory cleanup and git branch restructuring completed on **June 1, 2026**. 

To maintain a premium, professional production repository, all non-active guidance files and static single-page HTML backup files have been archived into a safety branch and removed from the active `main` branch.

---

## 📂 Archived Branch Details
*   **Safety Branch Name**: `old_redundant`
*   **Purpose**: Retains all historical files, guides, and pre-React versions of your portfolio site for secure backup.
*   **Status**: Locally created and successfully committed.

---

## 🧹 Cleaned & Archived Files

The following files have been removed from the `main` branch to keep the active repository lean and focused solely on the React application:

| File Name | Archived Path | Original Purpose & Description |
| :--- | :--- | :--- |
| `index-BACKUP-before-reactbits-swap.html` | `/index-BACKUP-before-reactbits-swap.html` | A historical backup of the original single-page HTML and CSS portfolio site prior to migrating to React. |
| `index-with-reactbits-particles.html` | `/index-with-reactbits-particles.html` | A static prototype of the single-page portfolio containing UMD-loaded React and ReactBits particle canvas code. |
| `REACTBITS_IMPLEMENTATION_GUIDE.md` | `/REACTBITS_IMPLEMENTATION_GUIDE.md` | An implementation markdown guide with step-by-step instructions on setting up WebGL particles in React. |
| `REVERT-INSTRUCTIONS.md` | `/REVERT-INSTRUCTIONS.md` | A reference instruction file detailing how to revert changes if necessary. |

---

## 🌟 Upgraded Active Files on `main`

The `main` branch now contains only the production-ready source code:
*   📁 `src/` — Active React components, pages (Hero, Timeline, Grid), and CSS styles.
*   📁 `public/` — HTML skeletal shell and assets.
*   📄 `package.json` & `package-lock.json` — React scripts and dependencies.
*   📄 `PORTFOLIO_UPGRADE_LOG.md` — Upgrade log documenting the recent subtitle layout and custom Resume button implementation.
*   📄 `CLEANUP_LOG.md` — This current branch cleanup log.

---

## 🚀 How to Sync Local Git Branches to GitHub

Because the local development environment connects natively to your authenticated Git client (such as VS Code, GitHub Desktop, or git credentials), you can push these cleanups directly to your GitHub repository with these simple terminal commands:

```powershell
# 1. Push your clean main branch to GitHub
git push origin main --force

# 2. Push the safety archive branch to GitHub
git checkout old_redundant
git push origin old_redundant
git checkout main
```

---

## 🧹 Code Cleanups & Optimization (September 8, 2026)

*   **File**: `src/pages/DeepDive/NFS_MW_2005.jsx`
    *   **Action**: Architectural refactors for responsive layout stability and visual polish.
    *   **Details**:
        *   **Chromium 3D Context Fix**: Resolved backface-visibility bleed-through by replacing 3D CSS transforms with Framer Motion `<AnimatePresence mode="wait">` slide/fade mounting for the Faction switcher.
        *   **Zero-Shift Ghost Sizer**: Built a dual-layer CSS Grid ghost sizing structure for Section 3.5 so all 3 slides share identical container height across both mobile and desktop viewports (`Δ = 0px`).
        *   **Typography & Contrast**: Unified Section 3.6 flip card action labels to `#4fc3f7` bold monospace, replaced letterboxed `objectFit: 'contain'` on video with `cover`, and darkened background overlays to eliminate glare and enhance readability.
        *   **Flex Overflow Guard**: Added `minWidth: 0`, `maxWidth: 'min(950px, 100%)'`, and internal table scrolling in Section 5 to eliminate horizontal page overflow and center the card with symmetric 14px margins on mobile.

*   **Files**: `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`, `src/components/UI/ContactButton.jsx`
    *   **Action**: Layout optimization and componentization of contact section and mail button.
    *   **Details**:
        *   **Component Separation**: Extracted `ContactButton.jsx` as a reusable CTA component mirroring `KnowMoreButton.css` with signature orange borders, gradients, text-glow, and particle effects.
        *   **Viewport Height & Centering**: Converted `#contact` from `min-height: auto` into a full-height flex container (`min-height: calc(100dvh - var(--header-height, 70px))`) with centered alignment and generous breathing room.
        *   **Observer Sensitivity**: Reduced `IntersectionObserver` threshold to `0.05` and rootMargin to `-20px` to ensure instant element reveal without requiring manual scroll past the screen edge.
        *   **Mobile Hero 100% Fold**: Cleaned up mobile media queries in `App.css` and `Home.css` to remove the `85dvh` override, guaranteeing the initial hero view occupies exactly 100% of any device screen height.

---

## 🧹 Code Cleanups & Optimization (September 9, 2026)

*   **Files**: `public/nfs-most-wanted/index.html`, `src/pages/Home/Home.jsx`, `src/App.jsx`, `public/sitemap.xml`, `public/llms.txt`
    *   **Action**: Clean canonical path migration and legacy hash-router redirection.
    *   **Details**:
        *   **Static Pre-rendering**: Created `public/nfs-most-wanted/index.html` with vanilla JS/CSS, ensuring 100% of prose, tables, and metric formulas are visible to web crawlers, search engines, and LLM scrapers without client-side hydration.
        *   **Dynamic Route Normalization**: Repointed DepthCarousel card in `Home.jsx` to navigate directly to `/nfs-most-wanted/`.
        *   **Graceful 301-equivalent Client Fallback**: Routed legacy SPA path `/#/DeepDive/NFS_MW_2005` in `App.jsx` to `RedirectToNfsMostWanted`, using `window.location.replace('/nfs-most-wanted/')` so existing bookmarks seamlessly resolve to the canonical path.
        *   **Search & LLM Index Registration**: Enriched `sitemap.xml` with `<loc>https://adwaith-mrv.github.io/nfs-most-wanted/</loc>` and `llms.txt` with a markdown overview link.

---

## 🧹 Code Cleanups & Optimization (September 21, 2026)

*   **Files**: `src/App.css`, `src/pages/DeepDive/NFS_MW_2005.jsx`
    *   **Action**: Dual vertical scrollbar removal and root scroll container unification.
    *   **Details**:
        *   **CSS Overflow Cascade Fix**: Removed `overflow-x: hidden;` on `body` in `src/App.css` and set `overflow: visible;`. This prevents Chromium/WebKit/Gecko from computing `overflow-y: auto` on `body`, completely eliminating the nested/secondary vertical scrollbar track.
        *   **Scroll-Snap Lock Resolution**: By establishing the window viewport as the single, authoritative scroll container, mouse wheel and touch delta events are no longer trapped or intercepted by a nested body scroll element, restoring instant smooth snapping between sections.
        *   **Inline Style Cleanup**: Updated `src/pages/DeepDive/NFS_MW_2005.jsx` to clear `document.body.style.overflow` with `''` upon video completion or component unmount instead of forcing `'auto'`.

*   **Files**: `src/components/UI/KnowMoreButton.css`, `src/components/UI/Navbar.jsx`, `src/components/UI/Navbar.css`, `src/components/UI/ContactButton.jsx`, `src/components/UI/LinkedInButton.jsx`, `src/components/UI/ResumeButton.jsx`, `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`
    *   **Action**: Button color and animation cross-pollination, LinkedIn CTA, and Contact Form fallback integration.
    *   **Details**:
        *   **Color Scheme Unification**: Re-themed `adwaith.mrv@gmail.com` and new `LinkedIn` button to match the Resume button's coral-to-cyan gradient (`#FF7043` to `#4FC3F7`) and glowing borders.
        *   **Animation Synchronization**: Ported expanding radial glow (`.btn-glow`) and multi-color particle explosions (`.btn-particles`) onto desktop and mobile Resume buttons.
        *   **Dual-Path Email / Form Fallback**: Added blur-detection timer on email click to automatically reveal the direct contact form when no external mail client responds, with manual toggle option and clipboard copy confirmation.

*   **Files**: `src/config/audioConfig.js`, `src/App.jsx`, `src/pages/Home/Home.jsx`, `src/components/UI/Navbar.jsx`
    *   **Action**: Temporary background audio deactivation and sound button hiding via feature flag.
    *   **Details**:
        *   **Feature Flag Architecture**: Established `src/config/audioConfig.js` exporting `AUDIO_ENABLED = false;`. Allows one-line re-activation whenever requested.
        *   **Interaction Listeners & Element Deactivation**: Guarded `App.jsx` user-gesture event listeners and `<audio id="bg-music">` rendering with `AUDIO_ENABLED`, preventing any automatic or interaction-triggered sound.
        *   **Hero CTA Protection**: Guarded `scrollToAbout` audio invocation in `Home.jsx` with `AUDIO_ENABLED`.
        *   **Sound Button Hiding**: Preserved desktop and mobile drawer sound toggle buttons in `Navbar.jsx` while conditionally hiding them from render when `!AUDIO_ENABLED`.

*   **Files**: `src/pages/Home/Home.jsx`, `public/assets/certificates/*`
    *   **Action**: Migration of Google Drive certification links to self-hosted static assets.
    *   **Details**:
        *   **Elimination of Auth/Login Friction**: Replaced 5 Google Drive URLs with direct self-hosted files (`.pdf` and `.png`) in `public/assets/certificates/`, removing all sign-in requirements and permissions walls.
        *   **Automated E2E Verification via Playwright**: Added Playwright test verifying 200 OK delivery on all assets and correct popup window resolution directly to the asset files.

*   **Files**: `src/App.css`
    *   **Action**: Multi-line certification card title and issuer horizontal centering.
    *   **Details**:
        *   **Text-Align Alignment**: Added `text-align: center; width: 100%;` to `.cert-title` and `.cert-issuer` and `text-align: center;` to `.cert-card .comet-card-content`. Ensures multi-line titles like "Certified Game Economy Designer" are centered line-by-line.
        *   **Automated Verification**: Verified `titleAlign: 'center'` on all 9 cards via Playwright.

*   **Files**: `src/pages/Home/Home.jsx`, `src/App.css`, `src/assets/icons/*`
    *   **Action**: Official brand logo integration across all 9 certification cards.
    *   **Details**:
        *   **Brand Icon Asset Upgrades**: Replaced emoji placeholders with official SVGs and lossless images for Machinations.io, Anthropic, Electronic Arts, McKinsey & Company, JP Morgan Chase, Pendo, Google Cloud, and n8n.
        *   **Dark Mode Contrast Optimization**: Configured CSS invert filters for Anthropic, white text paths for Pendo and Google Cloud, and iconic Chase Octagon vector in Chase Blue (`#117ACA`) for JP Morgan Chase.
        *   **Standardized Icon Box**: Implemented `.cert-icon-container` with uniform 52px height and centered flex alignment to maintain consistent card baselines and text alignment.
        *   **Automated Verification**: Full Playwright test suite verified all 9 images load with valid natural dimensions, centered text alignment, and direct credential links.

*   **Files**: `public/tau-readiness/*`, `src/App.jsx`, `src/pages/Home/Home.jsx`, `public/sitemap.xml`, `public/llms.txt`
    *   **Action**: Warframe: Tau launch-readiness static teardown migration and Canva embed removal.
    *   **Details**:
        *   **Static Pre-rendering**: Created `public/tau-readiness/index.html` with complete semantic `<head>`, OpenGraph, Twitter card, Schema.org `Article` JSON-LD, design tokens from Venus Gate, and pre-rendered prose across all 4 pillars and concurrency bars.
        *   **Canva Embed Removal**: Eliminated legacy Canva iframe embed under `/#/DeepDive/TauReadiness`, replacing it with `RedirectToTauReadiness` (`window.location.replace('/tau-readiness/')`) in `src/App.jsx`, completely purging Canva network dependencies and tracker scripts.
        *   **Asset Ingestion**: Ingested 8 local WebP/PNG assets (`tau-card`, `tau-key-art`, `tau-logo`, `tennocon-2026-badge`), local typography in `assets/fonts/`, and 1200x630 `og.png`.
        *   **3D Carousel Integration**: Expanded `deepDiveItems` in `Home.jsx` to 4 items with Warframe: Tau in 3rd position, preserving zero mobile overflow and 50% origin centering.
        *   **Indexing**: Registered canonical URL in `public/sitemap.xml` and briefing in `public/llms.txt`.
        *   **Automated Verification**: Comprehensive Playwright test suite (`scratch/test-tau-readiness.js`) passed all 13 checks.

---
*Log generated by AntiGravity Coding Assistant.*
