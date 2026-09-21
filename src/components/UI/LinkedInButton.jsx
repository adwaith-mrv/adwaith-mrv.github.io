import React from 'react';
import './KnowMoreButton.css';

const LINKEDIN_URL = "https://www.linkedin.com/in/adwaith-v/";

const LinkedInButton = () => {
    return (
        <a 
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="know-more-btn contact-action-btn contact-linkedin-btn"
            aria-label="Adwaith V on LinkedIn"
            title="Open Adwaith V's LinkedIn Profile"
        >
            <span className="btn-text">LinkedIn</span>
            <div className="btn-glow"></div>
            <div className="btn-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </a>
    );
};

export default LinkedInButton;
