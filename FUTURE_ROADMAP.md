# Portfolio Development Roadmap

This document serves as a reminder and plan of action for future enhancements to Adwaith V's React Portfolio. These ideas were proposed on **June 1, 2026**, following the successful deployment of the tagline and Resume Button upgrades.

---

## ~~🌟 Feature 1: Product Showcase Carousel~~ [COMPLETED: June 2, 2026]
*   **Concept**: Add an interactive, high-end product carousel.
*   **Inspiration**: Lando Norris's website style/carousel / Framer Depth Cascade.
*   **Functional Goal**: Clicking a product card in the carousel routes the user to a dedicated, detailed page focusing on the Product Analysis write-up.
*   **Design Tokens**: High visual aesthetics, framer-motion physics, smooth gliding transition, premium gaming-inspired hover effects.

---

## 📅 Feature 2: Sleeker Experience Timeline
*   **Concept**: Revamp the Experience Timeline section to be visually sharper, more modern, and more readable.
*   **Functional Goal**:
    *   Sleeker vertical tracks and timeline nodes.
    *   Micro-interactions when hovering over career milestones.
    *   Streamlined descriptions with expandable text options or interactive tags for key deliverables (e.g., Salesforce, SME Lending CoE).

---

## ~~🧭 Feature 3: Dynamic Navigation Toolbar~~ [COMPLETED: September 2026]
*   **Concept**: A futuristic header toolbar providing seamless navigation between sections and audio controls.
*   **Completed Implementation**:
    *   Sticky header with responsive 3-band offsets (`--header-height`: 70px / 69px / 66px).
    *   Smooth anchor routing for all sections (About, Deep Dives, Experience, Certifications, Skills, Contact).
    *   Integrated sound toggle button (`🔊 Sound On` / `🔇 Sound Off`) synced with background audio playback state.
    *   Direct Resume CTA button.
    *   Mobile slide-out drawer with backdrop blur, keyboard accessibility (Escape), and outside-click dismissal.

---

## ~~🏎️ Feature 4: NFS MW Deep Dive Enhancements~~ [COMPLETED: September 8, 2026]
*   **Concept**: Visual and architectural enhancements for the NFS Most Wanted showcase page.
*   **Completed In Phase 1 & Phase 2**:
    *   Designed high-aesthetic unified glassmorphic card containers with Lakers-purple background gradient and custom faction borders.
    *   Resolved Chromium 3D blur flattening via `<AnimatePresence mode="wait">` smooth slide/fade mounting for Faction switcher.
    *   Engineered dual-layer CSS Grid ghost sizing in Section 3.5, locking card height across all 3 slides (`Δ = 0px`) on desktop and mobile.
    *   Unified Section 3.6 flip card typography (`#4fc3f7` bold monospace) and resolved video background glare with `objectFit: 'cover'` and 98% opaque card backgrounds.
    *   Centered Section 5 Live-Ops telemetry dashboard dynamically with symmetric 14px mobile margins and zero page overflow.

---

## ~~📱 Feature 5: Responsive Mobile Viewport & Contact CTA Button~~ [COMPLETED: September 8, 2026]
*   **Concept**: Mobile layout perfection across all device screens and dedicated contact CTA.
*   **Completed Implementation**:
    *   **100% Full Viewport Hero**: Enforced `100vh`/`100svh`/`100dvh` across all viewports, ensuring the "About Me" section never cuts into the initial screen fold on first load.
    *   **Timed Scroll Affordance**: Delayed chevron fade-in to the 3.0s mark after subtitle lines settle.
    *   **Contact CTA Button Component**: Transformed the mail ID link into a signature glowing button component (`ContactButton.jsx`) featuring `'BF Modernista'` typography, `#FF8F00` border, gradient fill, glow effects, and particle burst interactions.
    *   **Viewport Centering**: Set `#contact` to full viewport height (`min-height: calc(100dvh - var(--header-height))`), ensuring smooth navigation and prominent center-screen display when triggered from the navbar.

---

## 🌌 Feature 6: NFS MW Custom Particle Effects Upgrade
*   **Concept**: Custom visual particle effects tailored to the aesthetic theme of showcase pages.
*   **Functional Goal**:
    *   Search for or build custom particle configurations that closely match the **grungy, amber, smoky, and street-racing vibes** of NFS Most Wanted (2005) (replacing clean floating circles on racing deep dive pages).

