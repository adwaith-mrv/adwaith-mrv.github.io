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
