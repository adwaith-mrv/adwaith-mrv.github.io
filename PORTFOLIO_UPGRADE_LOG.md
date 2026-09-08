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



