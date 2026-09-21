# Portfolio Upgrade Log

This document serves as a detailed log of the upgrades and enhancements made to Adwaith V's React Portfolio. It provides context on the original implementation, the details of the upgrades, and customizable variables for future adjustments.

---

## Upgrade 1: Subtitle Text and Order Reorganization

### 1. Original Code Block & Behavior
*   **Location**: `src/pages/Home/Home.jsx`
*   **Original Code**:
    ```jsx
    <p className="subtitle">FinTech • Gaming • AI-Powered Solutions</p>
    ```
*   **What it was doing**: Displayed a bulleted list of main specialization pillars: "FinTech", "Gaming", and "AI-Powered Solutions" in that specific order under the main title.

### 2. Upgraded Code Block & Behavior
*   **Upgraded Code**:
    ```jsx
    <p className="subtitle">Gaming | FinTech | Product-first | AI-Powered Solutions</p>
    ```
*   **What it does**: Re-orders and updates the list to prioritize "Gaming", "FinTech", "Product-first", and "AI-Powered Solutions" separated by elegant vertical pipe dividers (`|`), reinforcing a sleek gaming-inspired design theme.

---

## Upgrade 2: Premium Resume Download Button Integration

### 1. Original Code Block & Behavior
*   **Location**: `src/pages/Home/Home.jsx`
*   **Original Code**:
    ```jsx
    {isLocked && <KnowMoreButton onClick={onUnlock} />}
    ```
*   **What it was doing**: Rendered the "Know More" lock-screen button, which completely disappeared once the site was unlocked. No resume download CTA was available in the Hero section.

### 2. Upgraded Code Block & Behavior
*   **Upgraded Code** (`src/pages/Home/Home.jsx`):
    ```jsx
    {isLocked ? (
        <KnowMoreButton onClick={onUnlock} />
    ) : (
        <ResumeButton href={resumeUrl} />
    )}
    ```
*   **What it does**: Instead of leaving the Hero section empty upon unlocking, it dynamically swaps the "Know More" button for a **"Download Resume"** button in the exact same location. This button links out to your resume hosted on Google Drive.

### 3. New Component Structure (`src/components/UI/ResumeButton.jsx`)
This component perfectly mirrors the visual and motion interactions of `KnowMoreButton` by using the exact same CSS stylesheet and HTML layout:
```jsx
import React from 'react';
import './KnowMoreButton.css'; // Reuses all glow, font, responsive, and particle styling

const ResumeButton = ({ href }) => {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', textDecoration: 'none' }}
        >
            <button className="know-more-btn" style={{ marginTop: '2rem' }}>
                <span className="btn-text">Download Resume</span>
                <div className="btn-glow"></div>
                <div className="btn-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            </button>
        </a>
    );
};

export default ResumeButton;
```

### 4. Customizable Variables Explained

The resume URL is defined in `src/pages/Home/Home.jsx` as a variable so you can easily update the link whenever you update your resume!

```jsx
// UPDATE THIS VARIABLE in src/pages/Home/Home.jsx to change your live resume:
const resumeUrl = "https://drive.google.com/file/d/1bYd79sS097N4rxO_SCoJux2w3ynx_v_u/view?usp=sharing";
```

#### How to update the resume link:
1.  Upload your latest resume PDF to Google Drive.
2.  Click **Share** > **Copy Link** (make sure access is set to *"Anyone with the link can view"*).
3.  Open `src/pages/Home/Home.jsx`.
4.  Find line 64 and replace the string `"https://drive.google.com/file/d/1bYd79sS097N4rxO_SCoJux2w3ynx_v_u/view?usp=sharing"` with your new copied Google Drive link.

---

## Upgrade 3: Strategic Deep Dives & Featured Work Carousel

### 1. New Section Overview
*   **Name**: Strategic Deep Dives
*   **Location**: `src/pages/Home/Home.jsx` (Positioned immediately after the "About Me" section).
*   **Purpose**: To prominently showcase product analysis, case studies, and business intelligence work using a highly premium interactive format.

### 2. Implementation Details
*   **Libraries Used**: `framer-motion` (for physics-based smooth animations), `react-router-dom` (for routing to dedicated pages).
*   **New Components**:
    *   `src/components/UI/DepthCarousel.jsx`: The core interactive carousel engine using Framer Motion's physics and drag capabilities.
    *   `src/components/UI/DepthCarousel.css`: Custom styling providing glassmorphism and depth.
    *   `src/pages/DeepDive/NFS_MW_2005.jsx`: A template page representing a dedicated showcase area.
*   **Routing Structure**: The application is wrapped in a `<HashRouter>` and utilizes `<AnimatePresence>` to achieve fade-in/fade-out animations as the user navigates between the `Home` feed and the deep dive pages.

### 3. Customizable Variables
*   **Carousel Data**: Inside `src/pages/Home/Home.jsx`, the `deepDiveItems` array controls the cards. You can freely add or remove items from this array, and the carousel will dynamically calculate the depth layers and stacking context!
*   **Adding New Pages**: Simply create a new component inside `src/pages/DeepDive/`, and add a `<Route>` within `App.jsx`.

---

## Upgrade 4: Refinement & Polishing of the Strategic Deep Dives Carousel

### 1. Sizing and 3D Coordinates Upscaling
*   **Card Upscaling**: Card dimensions were increased to **260px × 390px** (2:3 portrait aspect ratio) to occupy a larger footprint and feel more premium.
*   **Mathematical Cascade Coefficients**: The 3D coordinates in `getTransformForOffset` have been balanced for optimal layout:
    *   `x = col * 150` (overlapping horizontal width offsets)
    *   `y = row * 80` (expanded vertical separation)
    *   `z = -maxDist * 120` (3D stack layering depth)
*   **Scene Dimensions**: The 3D viewport bounding container is set to `width: 800px` and `height: 520px` to comfortably accommodate shifts without clipping, and scales uniformly down on mobile devices.

### 2. Scroll and Swipe Gesture Trapping
*   **Non-Passive Mouse Wheel Trap**: Bypassed standard React passive wheel behaviors and bound a native wheel listener using `{ passive: false }`. It locks window/page scrolling whenever the user scrolls within the carousel area *unless* they hit the first or last card, allowing a smooth escape.
*   **Mobile Touch Swipe Trap**: Attached vertical touch gesture tracking (`touchmove` with `{ passive: false }`) to mimic the scroll wheel trapping on mobile devices.
*   **Scroll Snap Optimization**: Zeroed vertical wrapper paddings and adjusted heights so the entire section occupies `~600px`. This fits fully inside standard viewports (`100vh`), aligning with CSS scroll snap rules.

### 3. Visual Polish and Video Configurations
*   **Delayed Text Fade-in**: Set text label opacity to `0` during 3D card translation/movement, animating to `1` with a `0.45s` delay *only* when the card is fully active in the foreground (`offset === 0`), eliminating browser subpixel blur.
*   **Muted Video loops**: Previews support autoplaying muted looping videos. Due to `object-fit: cover` styling, landscape video inputs (16:9) scale to fill the card automatically, cropping the outer edges without distortion.
*   **Multi-corner Badging**: Added support for placing labels on any card corner via `badgePosition` property (`bottom-left`, `bottom-right`, `top-left`, `top-right`).
*   **Minimalist Interface**: Removed the redundant arrow buttons to keep the layout clean, modern, and identical to Framer models.

---

## Upgrade 5: Video Asset Addition & Cinematic Scrolling Framework

### 1. Static Asset Integration
*   **Video File Location**: The high-fidelity `"Most Wanted Style Background.mp4"` (17.6MB) was moved from the parent directory to the static `public/assets/video/` directory, bypassing Webpack compiler overhead to load instantly.
*   **Cascade Card Preview**: Configured the NFS Most Wanted card in `deepDiveItems` inside `Home.jsx` to render this video preview in a muted, looping, auto-playing format (`mediaType: 'video'`).

### 2. Audio Control & Cinematic Timed Intro
*   **Background Music Pausing**: Automatically grabs the portfolio background music (`#bg-music`) and pauses it on mounting `NFS_MW_2005.jsx`. Resumes music playback upon unmount.
*   **Intro Audio Unmuting**: Plays the intro video unmuted (`muted={false}`) to enjoy the cinematic soundtrack, automatically muting standard scrubbing playback once scroll mode starts.
*   **Timed Title Card Fade-out**: Displays a glassmorphic title card overlay ("NFS MOST WANTED (2005)" + "Experiencing Cinematic Overview...") which automatically fades out exactly **1.05 seconds** (`1050ms`) after the video begins playing, revealing the video in full brightness.
*   **Deferred Writing Elements**: Keeps scrollbars and text overlays hidden during video playback, unlocking scroll and fading in content cards only when the video ends or is skipped.

### 3. Scroll-Snapping Alignment & Static Last Frame (Post-Intro)
*   **Centered Video Alignment (Object Fit Contain)**: Configured the fixed video element with `object-fit: contain` and `object-position: center center`. This displays the entire video frame inside the viewport without stretching or cropping, preserving all UI text (with black bars on the sides merging into the dark background).
*   **Static Frame Background**: Removed the experimental scroll-synced video scrubbing logic to restore clean native page scroll snapping. After playing through unmuted once during the intro lock, the video pauses and remains frozen on its final frame, serving as a clean, static graphic background.
*   **Dark Vignette Transition**: Fades in a dark radial-gradient overlay *only* after the intro completes, protecting text readability on top of the final frozen video frame.
*   **Viewport Snapping Flow**: Retained the standard `.section` structures aligned with the global `scroll-snap-type: y mandatory` in `App.css`. The user scrolls between sections exactly like on the Home page feed.
*   **Back Route Lock**: Implemented a mount check in `Home.jsx` that automatically scrolls the home feed directly to the `#deep-dives` section if the site is unlocked, restoring focus on back actions.

---

## Upgrade 6: Case Study Deep-Dive Page Redesign (NFS Most Wanted 2005)

### 1. Markdown Vault Content Migration
*   **Location**: `src/pages/DeepDive/NFS_MW_2005.jsx`
*   **What was done**: Replaced the entire mock layout with the full case study text from `Portfolio Content - NFS Most Wanted 2005.md`.
*   **Design & Architecture**: Organized the long-form analysis into structured, unified section cards that cleanly frame the content without clutter.

### 2. High-Aesthetic Glassmorphic UI (Lakers Purple Theme)
*   **Background Tint**: Configured all cards to share a global Lakers-purple-to-black gradient (`linear-gradient(135deg, rgba(85, 37, 131, 0.38) 0%, rgba(20, 10, 30, 0.55) 50%, rgba(10, 10, 10, 0.9) 100%)`). The opacity was optimized so the purple tint remains visible on all screens, regardless of the fixed background video behind it.
*   **Subtle Faction-Based Borders**: Implemented solid borders that dynamically accent each card's theme:
    *   **Orange (`rgba(255, 143, 0, 0.3)`)**: Highlights Racer-themed sections (Executive Summary, Storyline, Online integration, and PM Verdict).
    *   **Blue (`rgba(79, 195, 247, 0.3)`)**: Highlights Cop-themed sections (Retention/Friction buffers, Live-Ops dashboard).
    *   **Red (`rgba(255, 23, 68, 0.35)`)**: Highlights Friction/Loss aversion sections (Legacy framework).
*   **Standardized Headers**: Converted all section headers to match the golden-orange (`#ff8f00`), uppercase, shadowed text styling of the original section 3 header for layout consistency.

### 3. Interactive Components & Layout Enhancements
*   **Faction Switcher Tab**: Reconfigured Section 3 ("Setting up The Modernized Framework") to house the narrative text and the 3D-flippable faction card in one container, with a smooth 180-degree flip transition.
*   **Friction Buffer Cards**: Re-coded Section 3.6 to render flippable cards for "The Payback Buffer" and "Impound Strike Tokens".
*   **Verdict Panels Layout & Animation**:
    *   Increased the master card width of "The PM Verdict" to `maxWidth: '850px'` to allow two panels ("Major Feature Bet" and "Biggest Risk to LTV") to sit side-by-side with comfortable padding.
    *   Fixed a key translation typo on the "Biggest Risk to LTV" panel's `whileInView` animation (resetting `x: 0` instead of `y: 0`), bringing it back in-bounds and resolving the right-side padding overflow.
    *   Increased fade-in/slide-in transition durations for both panels by `0.3s` (now `0.9s`) for a premium visual entry.

### 4. Global UI & Typography Alignments
*   **Location**: `src/App.css`
*   **What was done**: Added a global CSS rule targeting all `button` elements to explicitly set `font-family: inherit`.
*   **Impact**: Ensures that the faction toggle tabs, fixed back navigation button, carousel Prev/Next, and cinematic skip buttons inherit the premium `'BF Modernista'` font family instead of falling back to default browser UI fonts.

---

## Upgrade 7: Responsive Hero Full-Viewport Display & Scroll Affordance Timing

### 1. Original Behavior & Root Cause
*   **Location**: `src/App.css` and `src/pages/Home/Home.css`
*   **Original Behavior**: On mobile screens and tablets (`@media (max-width: 1024px)`), `.hero` was set to `min-height: 85dvh`. This caused the initial hero view to cut off at 85% of the screen height, allowing the top edge of the "About Me" section to bleed into view on first load.
*   **Scroll Affordance**: The animated chevron was visible prematurely prior to the hero text settled state.

### 2. Upgraded Implementation & Behavior
*   **Enforced 100% Viewport Coverage**:
    *   Set `.hero` across `App.css` and `Home.css` to `min-height: 100vh; min-height: 100svh; min-height: 100dvh;`.
    *   Removed the `85dvh` override from media queries so the Hero is strictly 100% of the screen height on all phone resolutions (iPhone SE, XR, 13, 15, Pixel, Galaxy, iPad).
*   **Scroll Affordance Delay**:
    *   Updated `.scroll-affordance` animation in `src/components/UI/ScrollAffordance.css` to start at `opacity: 0` and fade in smoothly at the **3.0s mark**, right after the hero subtitle lines settle.
*   **Split Unlock & Audio Playback**:
    *   Separated `unlockOnly()` (handling first scroll gestures, arrow keys, and audio start) from `handleUnlock()` (which also triggers smooth scrolling to `#about` on button click).

---

## Upgrade 8: Mobile 3D DepthCarousel Centering & Horizontal Overflow Elimination

### 1. Original Behavior & Root Cause
*   **Location**: `src/components/UI/DepthCarousel.css` & `src/pages/Home/Home.css`
*   **Original Behavior**: The 3D carousel viewport bounding container had a hardcoded `width: 800px;`. On mobile viewports (<450px), this exceeded screen boundaries, clamping the left flex alignment to `0` and shifting the card ~185px off-center to the right. Furthermore, the 800px child induced page-level horizontal overflow (`scrollWidth > 430px`).

### 2. Upgraded Implementation & Behavior
*   **Fluid 3D Scene Width**:
    *   Updated `.depth-carousel-3d-scene` to `width: 100%; max-width: 800px;` so its 50% origin aligns dynamically with the true horizontal center of any screen.
*   **Responsive Scaling**:
    *   Added CSS media queries: `scale(0.8)` on `<=820px`, `scale(0.72)` on `<=580px`, and `scale(0.64)` on `<=400px` with matching container heights (`480px`, `440px`, `400px`).
*   **Overflow Guard**:
    *   Added `overflow-x: clip` to `#deep-dives` and `overflow-x: hidden` to `html` in `App.css`, guaranteeing zero page-level horizontal scrolling.

---

## Upgrade 9: NFS Most Wanted (2005) Deep Dive Architectural & Visual Fixes

### 1. Section 3 Faction Switcher Bleed-Through Resolution
*   **Location**: `src/pages/DeepDive/NFS_MW_2005.jsx`
*   **Issue**: In Chromium, `backdrop-filter: blur()` flattens 3D contexts into 2D, causing `backface-visibility: hidden` to fail and displaying reversed, mirrored text bleed-through when toggling between Racer and Cop.
*   **Fix**: Replaced 3D flip animation with Framer Motion `<AnimatePresence mode="wait">` conditional mounting (`key="racer"` vs `key="cop"`). Toggling between factions now transitions smoothly via fade & slide (`opacity: 0 -> 1`, `y: 12 -> 0`) with zero ghosting.

### 2. Section 3.5 Constant Card Sizing via CSS Grid Ghost Sizer
*   **Issue**: Switching between Slide 0 ("The Storyline & Universe", 54 words) and shorter Slides 1 & 2 ("Online Sandbox Experience" and "Shared Leaderboard Tracking") caused the card height to collapse abruptly by 80px–143px on mobile and desktop.
*   **Fix**:
    *   Converted `.carousel-equal-height` into a CSS Grid container (`grid-template-columns: 1fr`).
    *   Added an invisible `.carousel-ghost-sizer` layer (`gridArea: '1 / 1'`, `visibility: 'hidden'`, `pointerEvents: 'none'`, `aria-hidden="true"`) stacking all 3 slides simultaneously.
    *   The container dynamically locks to the height of the tallest slide under all font sizes, line-heights, and container widths. Navigating Next or Prev now maintains constant card height (`Δ = 0px`) with zero layout shift.
    *   Updated `unifiedCardStyle` padding from static `3rem` to `clamp(1.5rem, 5vw, 3rem)`.

### 3. Section 3.6 Retention Buffers Typography & Video Glare Fix
*   **Issue**: `"Click to Flip"` and `"Click to Return"` had mismatched fonts (`#888` grey monospace vs `#4fc3f7` bold cyan). Additionally, the background video peeked out as a daylight letterbox bar behind the cards on portrait mobile screens.
*   **Fix**:
    *   Unified `"CLICK TO FLIP ➔"` typography to match `"⬅ CLICK TO RETURN"` (`color: '#4fc3f7'`, `fontFamily: 'monospace'`, `fontWeight: 'bold'`, `letterSpacing: '0.5px'`).
    *   Changed background video `objectFit` from `'contain'` to `'cover'`, eliminating mobile letterboxing.
    *   Darkened post-intro ambient overlay from `rgba(0,0,0,0.15)` to `radial-gradient(circle, rgba(5, 5, 5, 0.72) 0%, rgba(5, 5, 5, 0.92) 100%)`.
    *   Applied opaque dark gradient backgrounds (`linear-gradient(135deg, rgba(30, 14, 45, 0.98) 0%, rgba(12, 8, 20, 0.99) 100%)`) to all flip cards.

### 4. Section 5 Live-Ops Telemetry Mobile Dynamic Centering
*   **Issue**: The 4-column closed-beta telemetry table stretched the card flex item beyond screen width, pushing the card off-center to the left and cutting off content on the right.
*   **Fix**: Constrained the card container with `maxWidth: 'min(950px, 100%)'`, `width: '100%'`, `minWidth: 0`, and `margin: '0 auto'`. Wrapped the table with `overflowX: 'auto'` and `maxWidth: '100%'`.
*   **Result**: Centered dynamically with symmetric 14px margins on mobile screens and zero page overflow.

---

## Upgrade 10: Contact Section Viewport Centering & Signature Mail ID Button

### 1. Original Behavior & Invisibility Issue
*   **Location**: `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`, `src/components/UI/Navbar.jsx`
*   **Original Behavior**:
    *   In `Home.css`, `#contact` had `min-height: auto` and small bottom padding (`padding: 60px 0 40px`).
    *   As the last element in the DOM, its total container height was only ~220px. Clicking **Contact** in the top navigation bar caused the browser to reach the bottom scroll limit (`scrollY = scrollHeight - innerHeight`) while `#contact` was still barely peeking into view at the bottom edge.
    *   The previous section ("Platform & Tooling") occupied the entire top half of the screen, pushing the email address below the screen fold.
    *   The email container had `.fade-in` with `rootMargin: '0px 0px -50px 0px'`. Because the element never reached 50px above the viewport bottom, it stayed stuck at `opacity: 0` (completely invisible).

### 2. New Component Architecture: `ContactButton.jsx`
*   **Location**: `src/components/UI/ContactButton.jsx`
*   **Design Tokens & CSS**:
    *   Reuses the signature button design system from `src/components/UI/KnowMoreButton.css`.
    *   **Font**: `'BF Modernista', 'Futura', 'Outfit', sans-serif`, 700 bold.
    *   **Colors**: Radiant orange border (`1.5px solid #FF8F00`), translucent orange gradient (`linear-gradient(135deg, rgba(255, 143, 0, 0.25) 0%, rgba(255, 112, 67, 0.35) 100%)`), `#FFFFFF` text with text-glow, and glowing outer drop shadow (`0 0 25px rgba(255, 143, 0, 0.35)`).
    *   **Text & Case**: Clean, lowercase `adwaith.mrv@gmail.com` with `letter-spacing: 0.5px` and responsive padding (`padding: 1rem clamp(1.5rem, 5vw, 2.5rem)`).
    *   **Effects**: Interactive hover glow (`.btn-glow`) and particle burst animations (`.btn-particles`).
    *   **Accessibility & Action**: `href="mailto:adwaith.mrv@gmail.com"`, `title="Send email to adwaith.mrv@gmail.com"`, and `aria-label="Send email to adwaith.mrv@gmail.com"`.

```jsx
import React from 'react';
import './KnowMoreButton.css';

const ContactButton = ({ email = "adwaith.mrv@gmail.com" }) => {
    return (
        <a 
            href={'mailto:' + email}
            className="know-more-btn contact-email-btn"
            aria-label={'Send email to ' + email}
            title={'Send email to ' + email}
        >
            <span className="btn-text">{email}</span>
            <div className="btn-glow"></div>
            <div className="btn-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </a>
    );
};

export default ContactButton;
```

### 3. Viewport-Aware Contact Section Layout & Intersection Observer
*   **Location**: `src/pages/Home/Home.css` and `src/pages/Home/Home.jsx`
*   **CSS Enhancements**:
    *   Set `#contact` to `min-height: calc(100vh - var(--header-height, 70px))` and `min-height: calc(100dvh - var(--header-height, 70px))`.
    *   Configured flexbox centering: `display: flex; flex-direction: column; justify-content: center; align-items: center;`.
    *   Balanced padding: `padding: 60px 1.5rem 80px` on mobile, `80px 1.5rem 100px` on desktop.
*   **Intersection Observer Optimization**:
    *   Tuned observer options to `threshold: 0.05` and `rootMargin: '0px 0px -20px 0px'` so the section reveals immediately without requiring deep scrolling.
*   **Result**: When clicking "Contact" in the navigation bar on any device (mobile or desktop), `#contact` smoothly aligns under the header with the title, subtitle, and Contact button prominently centered and 100% visible.

---

## Upgrade 4: Need for Speed: Most Wanted (2005) Clean Canonical Path Unification

### 1. Architectural Motivation
*   **Goal**: Unify the URL routing architecture across all Strategic Deep Dives. Previously, *Warframe: The Venus Gate* and *Publish the Bill Before the Grind* resided on clean, indexable static paths (`/venus-gate/` and `/binding-constraint/`), whereas *NFS Most Wanted (2005)* used a legacy client-side hash router path (`/#/DeepDive/NFS_MW_2005`).
*   **Solution**: Migrated *NFS Most Wanted (2005)* to a standalone, server-rendered static directory at `/nfs-most-wanted/` (`public/nfs-most-wanted/index.html`), while preserving full backwards compatibility through React Router redirects.

### 2. Standalone Page Architecture (`public/nfs-most-wanted/index.html`)
*   **SEO, AEO & Crawlability**: Full semantic `<head>` with OpenGraph metadata, Twitter cards, and Schema.org `Article` JSON-LD. Complete prose and metric formulas are 100% present in initial HTML view-source without requiring JavaScript execution.
*   **Aesthetics & Fidelity**: Preserved all visual mechanics and styling:
    *   Cinematic video background (`/assets/video/Most Wanted Style Background.mp4`) with overlay, title card, and "Skip Intro" button.
    *   Section 1: Executive Summary with monospace tags.
    *   Section 2: Legacy Framework with friction breakdown.
    *   Section 3: Modernized Framework with interactive Faction Switcher tabs (`Phoenix (Racer)` vs `Lazarus (Cop)`).
    *   Section 3.5: Universe & Online Integration with equal-height CSS grid ghost-sizer carousel and dot pagination.
    *   Section 3.6: Retention Buffers with 3D flip cards for `"Payback"` and `Impound Strike Tokens` (featuring unified `#4fc3f7` bold monospace action labels).
    *   Section 4: Current Market Dynamics cards.
    *   Section 5: Closed-Beta Analytics Dashboard with telemetry formulas and responsive horizontal scrolling.
    *   Section 6: The PM Verdict panels with cyan and orange accents.
*   **Navigation**: Fixed top-left `&larr; Back to Portfolio` button cleanly pointing back to `/#/`.

### 3. Portfolio & Router Integration
*   **Carousel Direct Routing** (`src/pages/Home/Home.jsx`): Updated the `deepDiveItems` entry for NFS to route directly to `/nfs-most-wanted/`.
*   **Backwards Compatibility Redirect** (`src/App.jsx`): Added `RedirectToNfsMostWanted` component which triggers `window.location.replace('/nfs-most-wanted/')` when `/DeepDive/NFS_MW_2005` is accessed, ensuring historical bookmarks and external links never break.
*   **Search & LLM Index Registration**:
    *   Added canonical entry `<loc>https://adwaith-mrv.github.io/nfs-most-wanted/</loc>` to `public/sitemap.xml`.
    *   Added entry with complete teardown description to `public/llms.txt`.

---

## Upgrade 5: Elimination of Duplicate Vertical Scrollbar & Scroll-Snap Lock Stabilization

### 1. Root Cause & Browser Behavior
*   **Location**: `src/App.css` (lines 77–90) and `src/pages/DeepDive/NFS_MW_2005.jsx` (lines 59, 70).
*   **The Issue**: Users observed a second, inner vertical scrollbar appearing along the right edge of the screen, and scrolling frequently became stuck or unresponsive, requiring multiple repeated wheel scrolls to move past sections.
*   **Technical Root Cause**:
    *   `html` had `overflow-x: hidden; scroll-snap-type: y mandatory;`.
    *   `body` also had `overflow-x: hidden;`.
    *   Under the CSS Overflow Level 3 specification, specifying `overflow-x: hidden` on an element whose `overflow-y` is unset/visible forces the browser to compute `overflow-y: auto`.
    *   Because `html` was already the primary viewport scroll container, `body` was promoted into an *independent inner scroll container* with its own 15px-wide vertical scrollbar track directly adjacent to the browser window scrollbar.
    *   When the user scrolled via wheel or touch gestures, scroll events were intercepted by the inner `body` container rather than `html`. Because `body` lacked scroll snapping while `html` awaited snap threshold deltas, the two scroll containers desynchronized, causing scrolling to freeze or get stuck.
    *   Additionally, in `NFS_MW_2005.jsx`, video unlock logic executed `document.body.style.overflow = 'auto'`, dynamically re-injecting inline scroll container styles on `body`.

### 2. Architectural Solution
*   **`src/App.css`**: Changed `body` from `overflow-x: hidden;` to `overflow: visible;`. This ensures `body` remains completely transparent to the layout flow and never establishes an independent scroll context.
*   **`src/pages/DeepDive/NFS_MW_2005.jsx`**: Changed `document.body.style.overflow = 'auto'` to `document.body.style.overflow = ''` so that post-video cleanup restores the clean stylesheet cascade rather than forcing an inline `'auto'`.
*   **Viewport Delegation**: `html` retains `overflow-x: hidden;` and `scroll-snap-type: y mandatory;`, keeping all vertical and horizontal scroll management strictly at the root window level.

### 3. Verification & Metrics
*   **Width Alignment**: `bodyClientWidth` now exactly matches `htmlClientWidth` (`1409px === 1409px` on 1440x900 desktop; `485px === 485px` on mobile), with 0px difference.
*   **Scrollbar Elimination**: Verified using headless Chrome CDP screenshots that the secondary vertical white scrollbar track is completely removed across all screen sizes.
*   **Smooth Navigation**: Tested smooth scrolling and snapping to `#about`, `#deep-dives`, and subsequent sections; scrolling responds smoothly on the first wheel tick without any sticking or snap lock.

---

## Upgrade 6: Unified Action Button Theming, Animations, and Contact Form Fallback

### 1. Requirements & Overview
*   **Requirement 1**: Copy the "Resume" button's color scheme onto the "adwaith.mrv@gmail.com" button while maintaining its rich hover animations.
*   **Requirement 2**: Copy the "adwaith.mrv@gmail.com" button's expanding glow and particle explosion animation onto the "Resume" button (desktop navbar, mobile drawer, and standalone components).
*   **Requirement 3**: Clicking "adwaith.mrv@gmail.com" should attempt to open the user's default email client; if no client opens or takes over, it should smoothly open the previous direct Contact Form.
*   **Requirement 4**: Add a "LinkedIn" button matching the color scheme and animations of the corrected email button, linking directly to `https://www.linkedin.com/in/adwaith-v/`.

### 2. Architectural Implementation
*   **Unified Color Scheme** (`src/components/UI/KnowMoreButton.css`):
    *   Defined `.contact-action-btn` with resting background `linear-gradient(135deg, rgba(255, 112, 67, 0.25) 0%, rgba(79, 195, 247, 0.25) 100%)`, `1.5px solid rgba(255, 143, 0, 0.55)`, and dual-tint box-shadow.
    *   Hover state transitions to `linear-gradient(135deg, #FF7043 0%, #4FC3F7 100%)` with cyan border accents and `translateY(-5px)` lift.
*   **Shared Interactive Animations** (`src/components/UI/Navbar.jsx` & `src/components/UI/Navbar.css`):
    *   Equipped both desktop `.navbar-resume-btn` and drawer `.drawer-resume-btn` with `.btn-text`, `.btn-glow`, and `.btn-particles`.
    *   Added `@keyframes explodeNavbar` so hover bursts three distinct particles (coral `#FF7043`, cyan `#4FC3F7`, and amber `#FFB74D`) alongside radial center glow expansion.
*   **Dual-Mode Email Handler & Contact Form Fallback** (`src/pages/Home/Home.jsx` & `src/components/UI/ContactButton.jsx`):
    *   `ContactButton` invokes `window.location.href = 'mailto:' + email` and sets an asynchronous blur listener. If `window.blur` does not fire within 900ms, it automatically opens the Contact Form.
    *   A direct toggle button allows users without desktop email clients to open the form with one click.
    *   The Contact Form provides validation for Name, Email, Company, Role, and Message, pre-populates mailto links, copies the text directly to the user's clipboard for webmail convenience, and presents an in-page confirmation screen with "Done" dismissal.
*   **New LinkedIn Button Component** (`src/components/UI/LinkedInButton.jsx`):
    *   Modular button opening `https://www.linkedin.com/in/adwaith-v/` in a new tab with `target="_blank" rel="noopener noreferrer"`.
    *   Rendered alongside the Email button inside `.contact-button-group` with responsive flexbox centering.

---

## Upgrade 7: Temporary Audio and Sound Control Deactivation (Feature Flagged)

### 1. Requirements & Overview
*   **Requirement 1**: Deactivate background audio playback and all interaction-based audio triggers across the entire application.
*   **Requirement 2**: Hide the "Sound On / Sound Off" toggle buttons from both desktop navigation and the mobile drawer.
*   **Requirement 3**: Retain 100% of the code, markup, handlers, and styles intact in the codebase, enabling instantaneous re-enablement upon request.

### 2. Architectural Implementation
*   **Central Feature Flag** (`src/config/audioConfig.js`):
    *   Created single source of truth `AUDIO_ENABLED = false`.
    *   Setting `AUDIO_ENABLED = true` instantly restores all background audio, autoplay event listeners, and sound toggle buttons without code refactoring.
*   **Audio Element & User Gesture Listeners** (`src/App.jsx`):
    *   The `<audio id="bg-music">` element is conditionally rendered based on `AUDIO_ENABLED`.
    *   The `useEffect` user gesture listeners (`scroll`, `wheel`, `touchmove`, `touchstart`, `pointerdown`, `mousedown`, `keydown`, `click`) return immediately when `!AUDIO_ENABLED`, preventing any audio playback attempts or console errors.
*   **Hero Section CTA Guard** (`src/pages/Home/Home.jsx`):
    *   Guarded `scrollToAbout` background audio play trigger with `if (AUDIO_ENABLED)`.
*   **Navigation & Mobile Drawer Controls** (`src/components/UI/Navbar.jsx`):
    *   Guarded audio state sync listeners and `toggleSound` handler with `if (!AUDIO_ENABLED) return;`.
    *   Conditionally rendered desktop `.navbar-sound-btn` and mobile `.drawer-sound-btn` using `{AUDIO_ENABLED && ( ... )}`, cleanly hiding the buttons while preserving all markup, aria labels, and icons in place.

---

## Upgrade 8: Self-Hosted Certification Assets & Playwright End-to-End Verification

### 1. Requirements & Problem Statement
*   **The Issue**: Five key certification cards (Machinations Game Economy Designer, Machinations Essentials, EA Product Management, McKinsey Forward, JPMorgan Chase Agile) previously pointed to Google Drive URLs (`usp=sharing` / `usp=drive_link`). These links frequently prompted visitors to sign in to a Google account, triggered permissions barriers, and loaded Google's heavy preview UI.
*   **Requirement 1**: Migrate the 5 certificates to self-hosted assets in `public/assets/certificates/` so that clicking any card opens the raw PDF or high-resolution PNG directly in the browser with zero login friction.
*   **Requirement 2**: Leave the remaining 4 credential-provider certificates (Anthropic AI Fluency via Skilljar, Pendo via Credly, GCP via Credly, n8n via community.n8n.io) untouched.
*   **Requirement 3**: Use Playwright for automated verification of asset delivery (HTTP 200, valid Content-Type, file sizes) and card popup click behaviors.

### 2. Architectural Implementation
*   **Asset Ingestion** (`public/assets/certificates/`):
    *   `machinations-certified-game-economy-designer.pdf` (184,160 bytes)
    *   `machinations-essentials.pdf` (161,550 bytes)
    *   `ea-product-management.png` (103,004 bytes)
    *   `mckinsey-forward-program.pdf` (353,359 bytes)
    *   `jpmorgan-chase-agile-program.png` (103,228 bytes)
*   **Home Component Route Updating** (`src/pages/Home/Home.jsx`):
    *   Updated the `url` property for each of the 5 cards from Google Drive URLs to the canonical relative paths (`/assets/certificates/...`).
*   **Playwright Verification Suite** (`scratch/test-certificates-playwright.js`):
    *   Launched headless Chromium using the system Chrome channel.
    *   Asserted all 9 cards render in `#certifications`.
    *   Asserted HTTP status 200 and non-empty payload for all 5 self-hosted assets.
    *   Simulated user clicks on each card and asserted the resulting popup opens directly to the self-hosted asset rather than Google Drive or a login page.

---

## Upgrade 9: Certification Card Text Centering Alignment Fix

### 1. Requirements & Problem Statement
*   **The Issue**: The text on the "Certified Game Economy Designer" card wrapped onto two lines ("Certified Game Economy" / "Designer"). Because `.cert-title` lacked an explicit `text-align: center`, multi-line titles defaulted to left-alignment (`text-align: left`), causing "Designer" to be flush to the left of the card text container rather than centered under "Certified Game Economy".
*   **Requirement**: Center "Certified Game Economy Designer" and all certificate card titles and issuer text horizontally within their cards.

### 2. Architectural Implementation
*   **`src/App.css`**:
    *   Added `text-align: center;` to `.cert-card .comet-card-content`.
    *   Added `text-align: center; width: 100%;` to `.cert-title` so that wrapped multi-line headings are strictly centered line-by-line.
    *   Added `text-align: center; width: 100%;` to `.cert-issuer` to maintain symmetry with the title.
*   **Playwright Automated Verification**:
    *   Asserted that `window.getComputedStyle(titleEl).textAlign === 'center'` and `window.getComputedStyle(issuerEl).textAlign === 'center'` across all 9 certification cards.
    *   Captured close-up artifact screenshot `cert_card_centered_machinations.png` and full section screenshot `certifications_grid.png`.

---

## Upgrade 10: Official Brand Logo Integration for Certifications

### 1. Requirements & Problem Statement
*   **The Issue**: The 9 certification cards previously used generic emoji placeholders (`🎮`, `⚙️`, `🧠`, `🕹️`, `🎯`, `⚡`, `🤖`, `☁️`, `🔧`) in `.cert-icon` above each credential title.
*   **Requirement**: Replace the emojis with official brand logos/emblems for:
    1. Machinations.io (Certified Game Economy Designer)
    2. Machinations.io (Machinations Essentials)
    3. Anthropic (AI Fluency)
    4. Electronic Arts (EA Product Management)
    5. McKinsey & Company (McKinsey Forward Program)
    6. JP Morgan Chase (Agile Program)
    7. Pendo (AI for Product Management)
    8. Google Cloud (Google Cloud Platform)
    9. n8n (n8n Automation Level 1)
*   **Constraints**:
    *   Preserve exact text centering on all cards.
    *   Maintain direct links to self-hosted certificate assets and credential platforms.
    *   Ensure crisp contrast and visual hierarchy on the dark navy card background (`#131D31`).
    *   Harmonize vertical rhythm across square badges, circular emblems, and wide wordmarks.

### 2. Architectural Implementation
*   **Asset Ingestion & Preparation** (`src/assets/icons/`):
    *   `machinationsLogo.svg`: Official purple geometric `M` glyph (`#5A55F4`) used for Cards 1 & 2.
    *   `Anthropic.webp`: High-resolution transparent wordmark, paired with CSS `filter: brightness(0) invert(1)` to render crisp white on the dark theme.
    *   `Electronic-Arts-Logo.svg`: Official red/white circular emblem.
    *   `McKinsey-Forward-Program.svg`: Official origami bird mark on royal blue square.
    *   `JPMC.svg`: Iconic Chase Octagon vector in Chase Blue (`#117ACA`), providing clean contrast and avoiding raw black box sticker artifacts.
    *   `Pendo_idc1rR1vR5_1.svg`: Official pink folded diamond mark (`#EC2059`) with white wordmark text paths for dark mode clarity.
    *   `google-cloud-logo.svg`: Official 4-color Google mark paired with white "Cloud" text.
    *   `n8n_pink+white_logo.svg`: Official pink nodes (`#EA4B71`) paired with white text.
*   **Container & Layout Standardization** (`src/App.css`):
    *   Introduced `.cert-icon-container` (`height: 52px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; width: 100%;`). Locks all cards to identical vertical baselines regardless of logo aspect ratios.
    *   Added `.cert-logo` styles with `object-fit: contain`, subtle hover scaling (`scale(1.08)`), and ambient drop shadow (`drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))`).
    *   Added logo-specific tuning classes (`.cert-logo-anthropic`, `.cert-logo-ea`, `.cert-logo-mckinsey`, `.cert-logo-jpmc`, `.cert-logo-pendo`, `.cert-logo-gcp`, `.cert-logo-n8n`).
*   **Component Rendering** (`src/pages/Home/Home.jsx`):
    *   Imported all 8 logo assets at module level.
    *   Replaced `icon` emoji properties with `logo` and `logoClass` across the array.
    *   Rendered `<div className="cert-icon-container"><img className={`cert-logo ${cert.logoClass || ''}`} src={cert.logo} alt={cert.issuer} /></div>`.

### 3. Playwright Automated Verification
*   **Test Suite** (`scratch/test-certificates-playwright.js`):
    *   Verified all 9 cards render with `img.cert-logo`.
    *   Asserted `img.complete === true`, `naturalWidth > 0`, and `naturalHeight > 0` across all 9 logos.
    *   Asserted `titleAlign === 'center'` and `issuerAlign === 'center'` across all cards.
    *   Verified HTTP 200 and Content-Type on all 5 self-hosted assets.
    *   Asserted popup click targets open canonical `/assets/certificates/` files without redirecting to Google Drive.
    *   Captured visual proof artifacts: `certifications_with_official_logos.png` and `cert_card_official_logo_machinations.png`.

---

## Upgrade 11: Warframe: Tau Standalone Static Teardown Page & Carousel Integration

### 1. Requirements & Problem Statement
*   **The Issue**: The Tau deep dive was previously a heavy Canva embed under `/#/DeepDive/TauReadiness`: image-only slides, zero readable text, un-crawlable by search engines, and missing from the Home page 3D carousel.
*   **Requirement 1**: Rebuild Tau as a pure pre-rendered standalone static page at canonical path `/tau-readiness/` following the Amendment 8 architecture (`/venus-gate/`, `/binding-constraint/`, `/nfs-most-wanted/`), using the design tokens from `public/venus-gate/index.html` and shared `/assets/deepdive.css`.
*   **Requirement 2**: Preserve the dated pre-launch read banner linking to the original LinkedIn post of 13 July 2026.
*   **Requirement 3**: Provide a seamless hash-route redirect from `/#/DeepDive/TauReadiness` to `/tau-readiness/` with zero third-party Canva requests.
*   **Requirement 4**: Add Warframe: Tau as the 3rd card in the Home page 3D carousel (`deepDiveItems`) using the TennoCon 2026 attendee badge image (`/tau-readiness/assets/tau-card.webp`).
*   **Requirement 5**: Register canonical entries in `public/sitemap.xml` and `public/llms.txt`.

### 2. Architectural Implementation
*   **Standalone Page Build** (`public/tau-readiness/index.html`):
    *   Complete SEO `<head>` matching `public/assets/deepdive-template.html`: `<title>Warframe: Tau - a launch-readiness read | Adwaith V</title>`, description, canonical link, OpenGraph metadata, Twitter card, and `Article` JSON-LD (`datePublished: 2026-07-13`).
    *   Pre-rendered body fragment containing: back-link (`/#/`), masthead, Appearance toggle (shared `vg-theme` localStorage key), dated pre-launch read banner, key art with `<picture>` WebP/PNG fallback, 90-second D30 read block, Pillar 01 (Behavioural loop & telemetry), Pillar 02 (Economic stabilisation & Bloom value capture), Pillar 03 (Tech/ops infrastructure & concurrency bars), Pillar 04 (Balanced strategic matrix), closing Tau logo panel with attendee badge, and Sources & Method provenance.
*   **Asset Ingestion** (`public/tau-readiness/assets/` & `og.png`):
    *   Copied 8 assets from source vault (`tau-card.webp`/`.png`, `tau-key-art.webp`/`.png`, `tau-logo.webp`/`.png`, `tennocon-2026-badge.webp`/`.png`) and copied `tau-readiness-og.png` to `public/tau-readiness/og.png` (1200x630, uncompressed).
    *   Provided local fonts in `public/tau-readiness/assets/fonts/`.
*   **Hash-Route Redirect Component** (`src/App.jsx`):
    *   Replaced Canva embed route with `RedirectToTauReadiness` executing `window.location.replace('/tau-readiness/')`. Eliminated all Canva script and iframe dependencies.
*   **3D DepthCarousel 4-Card Cascade** (`src/pages/Home/Home.jsx`):
    *   Inserted Warframe: Tau as the 3rd item in `deepDiveItems` (Venus Gate, Publish the Bill, Tau, NFS Most Wanted) with semantic `<motion.a>` linking to `/tau-readiness/` and portrait media `/tau-readiness/assets/tau-card.webp` (`fit: 'cover'`).
*   **Index Updates** (`public/sitemap.xml` & `public/llms.txt`):
    *   Added `<loc>https://adwaith-mrv.github.io/tau-readiness/</loc>` to `sitemap.xml`.
    *   Enriched `llms.txt` with the factual briefing entry for Warframe: Tau.

### 3. Playwright Automated Verification
*   **Test Suite** (`scratch/test-tau-readiness.js`):
    *   **HTTP 200 & View-Source**: Full article prose visible in DOM, all 4 pillar headings present, valid title, description, and canonical URL.
    *   **OG Preview Image**: `og.png` returned HTTP 200 with 414,855 bytes.
    *   **Images & Alt Tags**: All 3 images loaded as WebP with fallback and verified natural dimensions > 0 and non-empty alt tags.
    *   **Appearance Toggle**: Tested switching Light <-> Dark, verified DOM attribute `data-theme` and `localStorage.vg-theme`, and verified persistence across page reload.
    *   **Mobile Responsiveness**: Zero horizontal overflow (`scrollWidth === clientWidth`) at 390px and 360px viewports; responsive concurrency bars.
    *   **Navigation**: Verified back link points to `/#/` and LinkedIn banner opens original post in a new tab.
    *   **Hash-Route Redirect**: Verified `/#/DeepDive/TauReadiness` redirects to `/tau-readiness/` with zero requests to `canva.com`.
    *   **4-Card Carousel**: Verified all 4 cards render in order; active card centering and zero horizontal overflow held at 430px and 390px.
    *   **Sitemap & LLM Manifest**: Verified presence in both files.



